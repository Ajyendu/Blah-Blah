import CallControls from "./CallControls";

const VideoCallUI = ({
  activeCallUserId,
  activeCallUserName,
  activeCallUserAvatar,
  callActive,
}) => {
  return (
    <div style={overlay}>
      {/* Remote video */}
      <video id="remote-video" autoPlay playsInline style={remoteVideo} />

      {/* Local video */}
      <video id="local-video" autoPlay muted style={localVideo} />

      {/* Controls */}
      <div style={controls}>
        <CallControls
          activeCallUserId={activeCallUserId}
          name={activeCallUserName}
          avatar={activeCallUserAvatar}
          callActive={callActive}
        />
      </div>
    </div>
  );
};

export default VideoCallUI;

/* ================= STYLES ================= */

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100dvh", // 🔥 fixes mobile half-screen bug
  background: "#000",
  zIndex: 9999,
  overflow: "hidden",
};

const remoteVideo = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const localVideo = {
  position: "absolute",
  bottom: "100px",
  right: "16px",
  width: "120px",
  height: "160px",
  objectFit: "cover",
  borderRadius: "12px",
  border: "2px solid white",
  zIndex: 20, // 🔥 ensures visibility
};

const controls = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: "80px",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const endBtn = {
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  background: "#ef4444",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};
