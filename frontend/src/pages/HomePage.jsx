import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useAudioCall } from "../store/useAudioCall";
import { useRef } from "react";
import { useMoodBackground } from "../components/utils/mood/useMoodBackground";
// import ScreenSharePanel from "../components/utils/mood/ScreenSharePanel/ScreenSharePanel";
import "./Homepage.css";
import ChatNotes from "../components/ChatNotes";
import { useNoteStore } from "../store/useNoteStore";

const HomePage = ({
  messages,
  setActiveCallUserAvatar,
  setActiveCallUserId,
  setActiveCallUserName,
  setCallActive,
  setCalling,
  startCall,
  setCallType,
}) => {
  const { isNotesOpen } = useNoteStore();

  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();
  const theme = useThemeStore((s) => s.theme);

  const messagesRef = useRef(null);

  useMoodBackground(messages, authUser._id);

  return (
    // <div className="chat-container h-screen w-screen flex">
    <div className="app-shell h-screen w-screen flex">
      {/* CHAT SHELL */}
      <div className="flex flex-1 m-6 rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-[320px] border-r bg-white">
          <Sidebar />
        </div>

        {/* MAIN CHAT */}
        <div className="flex-1 flex flex-col bg-white">
          {!selectedUser ? (
            <NoChatSelected />
          ) : (
            // <div className={`chat-layout ${isScreenSharing ? "sharing" : ""}`}>
            //   <ChatContainer
            //     startCall={startCall}
            //     setCallType={setCallType}
            //     setCalling={setCalling}
            //     setCallActive={setCallActive}
            //     setActiveCallUserId={setActiveCallUserId}
            //     setActiveCallUserName={setActiveCallUserName}
            //     setActiveCallUserAvatar={setActiveCallUserAvatar}
            //   />
            //   {isScreenSharing && <ScreenSharePanel />}
            // </div>
            <div className={`chat-layout`}>
              <ChatContainer
                startCall={startCall}
                setCallType={setCallType}
                setCalling={setCalling}
                setCallActive={setCallActive}
                setActiveCallUserId={setActiveCallUserId}
                setActiveCallUserName={setActiveCallUserName}
                setActiveCallUserAvatar={setActiveCallUserAvatar}
              />
              {isNotesOpen && <ChatNotes />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
