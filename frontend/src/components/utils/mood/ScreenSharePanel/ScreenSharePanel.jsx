import React, { useEffect, useRef } from "react";
import "./ScreenSharePanel.css";
import { useChatStore } from "../../../../store/useChatStore";

const ScreenSharePanel = () => {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const streamRef = useRef(null);

  const stopScreenShare = useChatStore((s) => s.stopScreenShare);

  useEffect(() => {
    startScreenShare();

    return () => {
      stopShare();
    };
  }, []);

  async function startScreenShare() {
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: 20 },
      audio: false,
    });

    streamRef.current = stream;

    const screenTrack = stream.getVideoTracks()[0];

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }

    const pc = pcRef.current;

    const sender = pc.getSenders().find((s) => s.track?.kind === "video");

    if (sender) {
      await sender.replaceTrack(screenTrack);
    } else {
      pc.addTrack(screenTrack, stream);
    }

    screenTrack.onended = stopShare;
  }

  function stopShare() {
    const pc = pcRef.current;
    const stream = streamRef.current;

    // stop tracks
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // restore camera
    if (pc) {
      const sender = pc.getSenders().find((s) => s.track?.kind === "video");

      if (sender && window.localCameraTrack) {
        sender.replaceTrack(window.localCameraTrack);
      }
    }

    // clear video
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    stopScreenShare();
  }

  return (
    <div className="screen-panel">
      <video ref={videoRef} autoPlay muted playsInline />
      <div className="screen-controls">
        <button onClick={stopShare}>Stop</button>
      </div>
    </div>
  );
};

export default ScreenSharePanel;
