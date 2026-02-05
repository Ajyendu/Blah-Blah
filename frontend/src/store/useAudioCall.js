import { useRef, useEffect } from "react";
import { socket } from "../lib/socket";
let remoteAudioEl = null;
let remoteStream = null;
export function unlockRemoteAudio() {
  if (!remoteAudioEl) {
    remoteAudioEl = document.createElement("audio");
    remoteAudioEl.id = "remote-audio";
    remoteAudioEl.autoplay = true;
    remoteAudioEl.playsInline = true;
    remoteAudioEl.muted = false;
    document.body.appendChild(remoteAudioEl);
  }

  remoteAudioEl.play().catch(() => {});
  return remoteAudioEl; // 🔥 THIS WAS MISSING
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
  const callTypeRef = useRef("audio"); // "audio" | "video"
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteUserIdRef = useRef(null);

  /* ================= PEER ================= */
  const createPeer = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.ontrack = (e) => {
      const stream = e.streams[0];
      console.log("🎯 track received:", e.track.kind);

      if (!remoteStream) {
        remoteStream = new MediaStream();
      }

      remoteStream.addTrack(e.track);

      if (remoteAudioEl) {
        remoteAudioEl.srcObject = stream;
        console.log("🔊 remote audio attached");
      }

      if (callTypeRef.current === "video") {
        const attachVideo = () => {
          const remoteVideo = document.getElementById("remote-video");
          if (!remoteVideo) {
            // React not mounted yet → retry
            setTimeout(attachVideo, 100);
            return;
          }

          remoteVideo.srcObject = remoteStream;
          remoteVideo.play().catch(() => {});
          console.log("🎥 remote video attached");
        };

        attachVideo();
      }
    };

    pc.onicecandidate = (e) => {
      if (e.candidate && remoteUserIdRef.current) {
        socket.emit("ice-candidate", {
          to: remoteUserIdRef.current,
          candidate: e.candidate,
        });
      }
    };

    pcRef.current = pc;
    return pc;
  };

  /* ================= STREAM ================= */
  const getLocalStream = async (type = "audio") => {
    if (!localStreamRef.current) {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      });
      const localVideo = document.getElementById("local-video");
      if (localVideo && type === "video") {
        localVideo.srcObject = localStreamRef.current;
      }
    }
    return localStreamRef.current;
  };

  /* ================= CALLER ================= */
  const startCall = async (userId, type) => {
    callTypeRef.current = type;
    remoteUserIdRef.current = userId;

    const pc = createPeer();

    // ✅ MUST get stream FIRST
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: type === "video",
    });

    localStreamRef.current = stream;

    // ✅ attach local preview

    if (type === "video") {
      attachLocalVideo(stream);
    }

    // ✅ ADD TRACKS BEFORE OFFER
    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    const offer = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: type === "video",
    });
    await pc.setLocalDescription(offer);

    socket.emit("call-user", { to: userId, offer, callType: type });
  };

  /* ================= RECEIVER ================= */
  const answerCall = async ({ from, offer, callType }) => {
    callTypeRef.current = callType;
    remoteUserIdRef.current = from;

    const pc = createPeer();

    await pc.setRemoteDescription(offer);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: callType === "video",
    });

    localStreamRef.current = stream;

    if (callType === "video") {
      attachLocalVideo(stream);
    }

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    const answer = await pc.createAnswer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: callType === "video",
    });
    await pc.setLocalDescription(answer);

    socket.emit("answer-call", { to: from, answer });
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

    const video = document.getElementById("remote-video");
    if (video) {
      video.srcObject = null;
      video.remove();
    }

    const audio = document.getElementById("remote-audio");
    if (audio) {
      audio.srcObject = null;
    }
    if (remoteAudioEl) {
      remoteAudioEl.srcObject = null;
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((t) => t.stop());
      remoteStream = null;
    }
  };

  /* ================= SOCKET ================= */
  useEffect(() => {
    socket.on("call-answered", async ({ answer }) => {
      if (!pcRef.current) return;
      await pcRef.current.setRemoteDescription(answer);
      window.dispatchEvent(new Event("call-accepted"));
    });

    socket.on("ice-candidate", async ({ candidate }) => {
      if (pcRef.current) {
        try {
          await pcRef.current.addIceCandidate(candidate);
        } catch {}
      }
    });

    socket.on("call-ended", () => {
      endCall(); // 🔥 single cleanup point
    });

    return () => {
      socket.off("call-answered");
      socket.off("ice-candidate");
      socket.off("call-ended");
    };
  }, []);

  return { startCall, answerCall, endCall };
}
