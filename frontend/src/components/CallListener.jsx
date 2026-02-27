import { useEffect, useState } from "react";
import { useAudioCall } from "../store/useAudioCall";
import IncomingCallModal from "./IncomingCallModal";
import { ringtone } from "./utils/ringtone";
import { useAuthStore } from "../store/useAuthStore";
import { DEFAULT_AVATAR_URL } from "../lib/defaultAvatar.js";

function CallListener({ setActiveCallUserId, setCallActive, setCallType }) {
  const socket = useAuthStore((s) => s.socket);
  const { answerCall } = useAudioCall();
  const [activeCallUserName, setActiveCallUserName] = useState("");
  const [activeCallUserAvatar, setActiveCallUserAvatar] = useState(null);
  const [incoming, setIncoming] = useState(null);

  useEffect(() => {
    if (!socket) return;
    socket.on("incoming-call", (data) => {
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
          setCallActive(true);
          setActiveCallUserId(incoming.from);
          setActiveCallUserName(incoming.name);
          setActiveCallUserAvatar(incoming.avatar);
          setIncoming(null);
          await answerCall(incoming);
        }}
        onReject={() => {
          socket.emit("end-call", { to: String(incoming.from) });
          setIncoming(null);
        }}
      />
    </div>
  );
}

export default CallListener;
