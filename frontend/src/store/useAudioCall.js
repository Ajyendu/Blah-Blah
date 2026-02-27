/**
 * Call connection + default audio: unlock on Call/Accept click, play remote stream when connected.
 */
import { useRef, useEffect, useState } from "react";
import { useAuthStore } from "./useAuthStore";
import { unlockForCall, playRemoteStream, stopRemoteAudio } from "../lib/callAudio.js";

// Single source of truth for the remote media stream (set in ontrack)
let remoteStream = null;

/** Get the current remote stream (for UI playback). */
export function getRemoteStream() {
  return remoteStream;
}

function attachLocalVideo(stream) {
  const tryAttach = () => {
    const video = document.getElementById("local-video");
    if (!video) {
      setTimeout(tryAttach, 100);
      return;
    }

    video.srcObject = stream;
    video.muted = true; // 🔒 REQUIRED
    video.playsInline = true;
    video.autoplay = true;

    video.play().catch(() => {});
    console.log("📷 local video attached");
  };

  tryAttach();
}

export function useAudioCall() {
  const socket = useAuthStore((s) => s.socket);
  const callTypeRef = useRef("audio");
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteUserIdRef = useRef(null);
  const iceCandidateQueueRef = useRef([]);
  const [remoteStreamState, setRemoteStreamState] = useState(null);
  const answerAudioResolveRef = useRef(null);

  const drainIceQueue = async () => {
    const pc = pcRef.current;
    const queue = iceCandidateQueueRef.current;
    if (!pc || queue.length === 0) return;
    while (queue.length > 0) {
      const c = queue.shift();
      try {
        const candidate = c && typeof c === "object" && c.candidate != null
          ? new RTCIceCandidate(c)
          : c;
        await pc.addIceCandidate(candidate);
      } catch (err) {
        console.error("addIceCandidate (drain) error:", err);
      }
    }
  };

  /* ================= PEER ================= */
  const createPeer = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
      ],
      iceCandidatePoolSize: 10,
    });

    pc.oniceconnectionstatechange = () => {
      console.log("🧊 iceConnectionState:", pc.iceConnectionState);
    };

    pc.ontrack = (e) => {
      if (pc.signalingState === "closed") return;
      console.log("🎯 track received:", e.track.kind, "enabled:", e.track.enabled, "readyState:", e.track.readyState);

      if (!remoteStream) {
        remoteStream = new MediaStream();
      }
      if (e.streams && e.streams[0]) {
        e.streams[0].getTracks().forEach((t) => {
          if (!remoteStream.getTracks().some((existing) => existing.id === t.id)) {
            remoteStream.addTrack(t);
          }
        });
      } else if (!remoteStream.getTracks().some((existing) => existing.id === e.track.id)) {
        remoteStream.addTrack(e.track);
      }
      e.track.enabled = true;
      setRemoteStreamState(remoteStream);
      window.dispatchEvent(new CustomEvent("remote-stream-ready", { detail: remoteStream }));

      if (e.track.kind === "audio") {
        playRemoteStream(remoteStream);
        if (answerAudioResolveRef.current) {
          answerAudioResolveRef.current();
          answerAudioResolveRef.current = null;
        }
      }

      if (callTypeRef.current === "video") {
        const attachVideo = (attempt = 0) => {
          const remoteVideo = document.getElementById("remote-video");
          if (!remoteVideo) {
            if (attempt < 50) setTimeout(() => attachVideo(attempt + 1), 100);
            return;
          }
          remoteVideo.srcObject = remoteStream;
          remoteVideo.play().catch(() => {});
          console.log("🎥 remote video attached");
        };
        attachVideo();
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("📡 connectionState:", pc.connectionState);
      if (pc.connectionState === "connected" && remoteStream) {
        setRemoteStreamState(remoteStream);
        playRemoteStream(remoteStream);
        window.dispatchEvent(new CustomEvent("remote-stream-ready", { detail: remoteStream }));
        // Ensure remote video element gets stream when it’s a video call (receiver may mount UI after ontrack)
        if (callTypeRef.current === "video") {
          const attachVideo = (attempt = 0) => {
            const remoteVideo = document.getElementById("remote-video");
            if (!remoteVideo) {
              if (attempt < 50) setTimeout(() => attachVideo(attempt + 1), 100);
              return;
            }
            remoteVideo.srcObject = remoteStream;
            remoteVideo.play().catch(() => {});
            console.log("🎥 remote video attached (on connected)");
          };
          attachVideo();
        }
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate && remoteUserIdRef.current) {
        socket.emit("ice-candidate", {
          to: remoteUserIdRef.current,
          candidate: e.candidate.toJSON ? e.candidate.toJSON() : e.candidate,
        });
      }
    };

    pcRef.current = pc;
    return pc;
  };

  /* ================= STREAM ================= */

  /* ================= CALLER ================= */
  const startCall = async (userId, type) => {
    unlockForCall();
    const toUserId = String(userId);
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    iceCandidateQueueRef.current = [];
    callTypeRef.current = type;
    remoteUserIdRef.current = toUserId;

    if (remoteStream) {
      remoteStream.getTracks().forEach((t) => t.stop());
      remoteStream = null;
      setRemoteStreamState(null);
    }

    const pc = createPeer();

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video: type === "video",
    }).catch(() =>
      navigator.mediaDevices.getUserMedia({ audio: true, video: type === "video" })
    );

    if (type === "video") {
      attachLocalVideo(stream);
    }

    localStreamRef.current = stream;

    stream.getTracks().forEach((t) => { t.enabled = true; });
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Send serializable description so socket doesn't drop fields
    socket.emit("call-user", {
      to: toUserId,
      offer: { type: offer.type, sdp: offer.sdp },
      callType: type,
    });
  };

  /* ================= RECEIVER ================= */
  const answerCall = async ({ from, offer, callType }) => {
    unlockForCall();
    const fromUserId = String(from);
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (answerAudioResolveRef.current) {
      answerAudioResolveRef.current();
      answerAudioResolveRef.current = null;
    }
    iceCandidateQueueRef.current = [];
    callTypeRef.current = callType;
    remoteUserIdRef.current = fromUserId;

    if (remoteStream) {
      remoteStream.getTracks().forEach((t) => t.stop());
      remoteStream = null;
      setRemoteStreamState(null);
    }

    const pc = createPeer();

    const desc =
      offer && typeof offer === "object" && offer.sdp
        ? new RTCSessionDescription({ type: offer.type || "offer", sdp: offer.sdp })
        : offer;
    await pc.setRemoteDescription(desc);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video: callType === "video",
    }).catch(() =>
      navigator.mediaDevices.getUserMedia({ audio: true, video: callType === "video" })
    );

    localStreamRef.current = stream;

    if (callType === "video") {
      attachLocalVideo(stream);
    }

    stream.getTracks().forEach((t) => { t.enabled = true; });
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    await drainIceQueue();

    socket.emit("answer-call", {
      to: fromUserId,
      answer: { type: answer.type, sdp: answer.sdp },
    });

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        if (answerAudioResolveRef.current) {
          answerAudioResolveRef.current();
          answerAudioResolveRef.current = null;
        }
      }, 10000);
      answerAudioResolveRef.current = () => {
        clearTimeout(timeout);
        resolve();
      };
    });
  };

  /* ================= END CALL ================= */
  const endCall = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    remoteUserIdRef.current = null;
    iceCandidateQueueRef.current = [];
    if (answerAudioResolveRef.current) {
      answerAudioResolveRef.current();
      answerAudioResolveRef.current = null;
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((t) => t.stop());
      remoteStream = null;
    }
    setRemoteStreamState(null);
    stopRemoteAudio();
  };

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!socket) return;
    socket.on("call-answered", async ({ answer }) => {
      const pc = pcRef.current;
      if (!pc || pc.signalingState !== "have-local-offer") return;
      try {
        const desc =
          answer && typeof answer === "object" && answer.sdp
            ? new RTCSessionDescription({ type: answer.type || "answer", sdp: answer.sdp })
            : answer;
        await pc.setRemoteDescription(desc);
        await drainIceQueue();
      } catch (err) {
        console.error("setRemoteDescription error:", err);
        return;
      }
      window.dispatchEvent(
        new CustomEvent("call-accepted", { detail: { callType: callTypeRef.current } })
      );
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (!pcRef.current || !candidate) return;
      const pc = pcRef.current;
      const hasRemote = pc.remoteDescription && pc.remoteDescription.type;
      if (!hasRemote) {
        iceCandidateQueueRef.current.push(candidate);
        return;
      }
      try {
        const c =
          candidate && typeof candidate === "object" && candidate.candidate != null
            ? new RTCIceCandidate(candidate)
            : candidate;
        await pc.addIceCandidate(c);
      } catch (err) {
        console.error("addIceCandidate error:", err);
      }
    });

    const handleCallEnded = () => endCall();
    socket.on("call-ended", handleCallEnded);

    return () => {
      socket.off("call-answered");
      socket.off("ice-candidate");
      socket.off("call-ended", handleCallEnded);
    };
  }, [socket]);

  return { startCall, answerCall, endCall, remoteStream: remoteStreamState };
}
