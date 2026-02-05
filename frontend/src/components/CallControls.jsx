import { socket } from "../lib/socket";
import CallTimer from "./CallTimer";
import { useEffect, useState } from "react";

function CallControls({ activeCallUserId, name, avatar, callActive }) {
  return (
    <div style={overlayStyle}>
      <div style={controlBarStyle}>
        <div style={userInfo}>
          <img src={avatar || "/avatar.png"} alt={name} style={avatarStyle} />
          <div>
            <div style={nameStyle}>{name}</div>
          </div>
        </div>

        <button
          onClick={() => {
            console.log("Ending call with:", activeCallUserId);
            socket.emit("end-call", { to: activeCallUserId });
          }}
          style={endBtn}
        >
          End
        </button>

        <CallTimer active={callActive} />
      </div>
    </div>
  );
}

export default CallControls;

/* ================= STYLES ================= */

const avatarStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  objectFit: "cover",
};

const userInfo = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};
const nameStyle = {
  color: "#fff",
  fontSize: "14px",
  fontWeight: "600",
};

const statusStyle = {
  color: "#aaa",
  fontSize: "12px",
};

const overlayStyle = {
  position: "fixed",
  bottom: "24px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
};

const controlBarStyle = {
  background: "#111",
  padding: "14px 20px",
  borderRadius: "40px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const endBtn = {
  background: "#e53935",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "20px",
  fontWeight: "600",
  cursor: "pointer",
};
