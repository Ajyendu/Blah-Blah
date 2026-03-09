import { useRef, useState, useEffect } from "react";
import CallTimer from "./CallTimer";
import { useAuthStore } from "../store/useAuthStore.js";
import { stopRemoteAudio } from "../lib/callAudio.js";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";
import { useIsMobile } from "../hooks/useMediaQuery";

function CallControls({
  activeCallUserId,
  name,
  avatar,
  callActive,
  isMuted,
  onToggleMute,
  onEndCall,
}) {
  const socket = useAuthStore((s) => s.socket);
  const isMobile = useIsMobile();
  const barRef = useRef(null);
  const [dragPos, setDragPos] = useState(null); // { top, left }
  const isDraggingRef = useRef(false);
  // Initial position: bottom-center (desktop) or bottom with padding (mobile)
  useEffect(() => {
    if (dragPos) return;
    const vh = window.innerHeight;
    if (isMobile) {
      setDragPos({ top: vh - 96, left: 16 });
    } else {
      setDragPos(null); // use bottom-center default
    }
  }, [isMobile, dragPos]);

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
    onEndCall?.();
    window.dispatchEvent(new Event("call-ended-local"));
  };

  const updateDragPosition = (clientX, clientY) => {
    if (!isDraggingRef.current || !barRef.current) return;
    const bar = barRef.current;
    const rect = bar.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Center the bar under the finger / cursor
    let nextTop = clientY - rect.height / 2;
    let nextLeft = clientX - rect.width / 2;
    // Clamp vertically so bar stays on-screen
    nextTop = Math.max(8, Math.min(vh - rect.height - 8, nextTop));
    // Clamp horizontally inside viewport on all devices
    nextLeft = Math.max(8, Math.min(vw - rect.width - 8, nextLeft));
    setDragPos({ top: nextTop, left: nextLeft });
  };

  // Dragging: allow user to pick the bar and move it anywhere on screen
  useEffect(() => {
    const handleMove = (e) => {
      updateDragPosition(e.clientX, e.clientY);
    };
    const handleUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    window.addEventListener("pointercancel", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleUp);
    };
  }, []);

  const handleDragStart = (e) => {
    // Don't start drag when clicking buttons
    if (e.target.closest("button")) return;
    isDraggingRef.current = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    updateDragPosition(clientX, clientY);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    updateDragPosition(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const barStyle = {
    ...controlBarStyle,
    ...(isMobile
      ? {
          width: "calc(100vw - 32px)",
          justifyContent: "space-between",
        }
      : {}),
  };

  const titleStyle = {
    ...nameStyle,
    ...(isMobile
      ? {
          maxWidth: "38vw",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }
      : {}),
  };

  return (
    <div
      style={
        dragPos && dragPos.top != null && dragPos.left != null
          ? { ...overlayBaseStyle, top: dragPos.top, left: dragPos.left }
          : { ...overlayBaseStyle, bottom: 24, left: "50%", transform: "translateX(-50%)" }
      }
    >
      <div
        ref={barRef}
        style={barStyle}
        onPointerDown={handleDragStart}
        onTouchStart={handleDragStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div style={userInfo}>
          <img
            src={avatar || DEFAULT_AVATAR_URL}
            alt={name}
            style={avatarStyle}
          />
          <div style={titleStyle}>{name}</div>
        </div>

        <div style={centerGroup}>
          <button
            onClick={() => onToggleMute?.()}
            style={muteBtn}
            type="button"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          <button onClick={handleEndCall} style={endBtn} type="button">
            End
          </button>
        </div>

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
const overlayBaseStyle = {
  position: "fixed",
  zIndex: 9999,
};
const controlBarStyle = {
  background: "#111",
  padding: "12px 22px",
  borderRadius: "999px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  gap: "18px",
};
const centerGroup = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};
const endBtn = {
  background: "#e53935",
  color: "#fff",
  border: "none",
  padding: "8px 18px",
  borderRadius: "999px",
  fontWeight: "600",
  cursor: "pointer",
};
const muteBtn = {
  background: "#ffffff",
  color: "#111827",
  border: "none",
  padding: "8px 14px",
  borderRadius: "999px",
  fontWeight: "500",
  cursor: "pointer",
  fontSize: "13px",
};
