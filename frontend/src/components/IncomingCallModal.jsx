import { useState } from "react";
import { unlockRemoteAudio } from "../store/useAudioCall";

function IncomingCallModal({ caller, onAccept, onReject }) {
  const overlay = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const card = {
    background: "#0f172a",
    color: "#fff",
    width: "320px",
    padding: "28px 24px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
  };

  const avatar = {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    objectFit: "cover",
    display: "block",
    margin: "0 auto 16px auto", // 🔥 CENTERED
  };

  const name = {
    fontSize: "20px",
    fontWeight: 600,
    margin: 0,
  };

  const subtitle = {
    fontSize: "14px",
    opacity: 0.7,
    marginTop: "6px",
  };

  const actions = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
    gap: "12px",
  };

  const rejectBtn = {
    flex: 1,
    background: "#ef4444",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  };

  const acceptBtn = {
    flex: 1,
    background: "#22c55e",
    border: "none",
    borderRadius: "10px",
    padding: "12px",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={overlay}>
      <div style={card}>
        <img src={caller.avatar} alt={caller.name} style={avatar} />

        <h2 style={name}>{caller.name}</h2>
        <p>
          {caller.callType === "video"
            ? "Incoming video call"
            : "Incoming audio call"}
        </p>
        <p style={subtitle}>is now calling…</p>

        <div style={actions}>
          <button style={rejectBtn} onClick={onReject}>
            ❌ Reject
          </button>
          <button
            style={acceptBtn}
            onClick={() => {
              unlockRemoteAudio();
              onAccept();
            }}
          >
            📞 Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncomingCallModal;
