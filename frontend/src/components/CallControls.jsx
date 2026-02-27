import CallTimer from "./CallTimer";
import { useAuthStore } from "../store/useAuthStore.js";
import { useAudioCall } from "../store/useAudioCall.js";
import { stopRemoteAudio } from "../lib/callAudio.js";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";

function CallControls({ activeCallUserId, name, avatar, callActive }) {
  const socket = useAuthStore((s) => s.socket);
  const { endCall } = useAudioCall();

  const handleEndCall = () => {
    const toUserId =
      activeCallUserId == null
        ? null
        : typeof activeCallUserId === "string"
          ? activeCallUserId.trim()
          : (activeCallUserId._id != null ? String(activeCallUserId._id) : String(activeCallUserId));
    if (toUserId) {
      socket.emit("end-call", { to: toUserId });
    }
    stopRemoteAudio();
    endCall();
    window.dispatchEvent(new Event("call-ended-local"));
  };

  return (
    <div style={overlayStyle}>
      <div style={controlBarStyle}>
        <div style={userInfo}>
          <img
            src={avatar || DEFAULT_AVATAR_URL}
            alt={name}
            style={avatarStyle}
          />
          <div style={nameStyle}>{name}</div>
        </div>

        <button onClick={handleEndCall} style={endBtn} type="button">
          End
        </button>

        <CallTimer active={callActive} />
      </div>
    </div>
  );
}

export default CallControls;

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
