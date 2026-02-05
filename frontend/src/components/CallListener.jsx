import { socket } from "../lib/socket";
import { useEffect, useState } from "react";
import { useAudioCall } from "../store/useAudioCall";
import IncomingCallModal from "./IncomingCallModal";
import { ringtone } from "./utils/ringtone";

function CallListener({ setActiveCallUserId, setCallActive, setCallType }) {
  const { answerCall } = useAudioCall();
  const [activeCallUserName, setActiveCallUserName] = useState("");
  const [activeCallUserAvatar, setActiveCallUserAvatar] = useState(null);
  const [incoming, setIncoming] = useState(null);

  useEffect(() => {
    socket.connect();
    socket.on("incoming-call", (data) => {
      setCallType(data.callType); // ✅ THIS LINE
      setActiveCallUserId(data.from);
      setIncoming(data);
    });

    socket.on("call-ended", () => {
      ringtone.pause();
      setCallActive(false);
      ringtone.currentTime = 0;
      console.log("📴 call ended");
      setIncoming(null);
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-ended");
    };
  }, []);

  if (!incoming) return null;

  return (
    <div>
      <IncomingCallModal
        caller={{
          name: incoming.name ?? incoming.from,
          avatar: incoming.avatar || "/avatar.png",
          type: incoming.callType,
        }}
        onAccept={async () => {
          await answerCall(incoming);
          setIncoming(null);
          setCallActive(true);
          setActiveCallUserId(incoming.from);
          setActiveCallUserName(incoming.name);
          setActiveCallUserAvatar(incoming.avatar);
        }}
        onReject={() => {
          socket.emit("end-call", { to: incoming.from });
          setIncoming(null);
        }}
      />
    </div>
  );
}

export default CallListener;
