import { useEffect, useState } from "react";
import IncomingCallModal from "./IncomingCallModal";
import { ringtone } from "./utils/ringtone";
import { useAuthStore } from "../store/useAuthStore";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";

function CallListener({ setActiveCallUserId, setCallActive, setCallType, answerCall, setActiveCallUserName, setActiveCallUserAvatar }) {
  const socket = useAuthStore((s) => s.socket);
  const [incoming, setIncoming] = useState(null);

  useEffect(() => {
    if (!socket) return;
    socket.on("incoming-call", (data) => {
      try {
        ringtone.currentTime = 0;
        ringtone.volume = 1;
        ringtone.play().catch(() => {});
      } catch {
        // ignore autoplay errors
      }
      setCallType(data.callType);
      setActiveCallUserId(data.from);
      setIncoming(data);
    });

    const handleCallEnded = () => {
      ringtone.pause();
      setCallActive(false);
      ringtone.currentTime = 0;
      setIncoming(null);
    };
    socket.on("call-ended", handleCallEnded);

    return () => {
      socket.off("incoming-call");
      socket.off("call-ended", handleCallEnded);
    };
  }, [socket, setCallType, setCallActive, setActiveCallUserId]);

  if (!incoming) return null;

  return (
    <div>
      <IncomingCallModal
        caller={{
          name: incoming.name ?? incoming.from,
          avatar: incoming.avatar || DEFAULT_AVATAR_URL,
          type: incoming.callType,
          callType: incoming.callType,
        }}
        onAccept={async () => {
          // Show call card + timer immediately; connect in background
          ringtone.pause();
          ringtone.currentTime = 0;
          setCallActive(true);
          setActiveCallUserId(incoming.from);
          setActiveCallUserName(incoming.name ?? incoming.from);
          setActiveCallUserAvatar(incoming.avatar || DEFAULT_AVATAR_URL);
          setIncoming(null);
          await answerCall(incoming);
        }}
        onReject={() => {
          ringtone.pause();
          ringtone.currentTime = 0;
          socket.emit("end-call", { to: String(incoming.from) });
          setIncoming(null);
        }}
      />
    </div>
  );
}

export default CallListener;
