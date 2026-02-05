import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useAudioCall } from "../store/useAudioCall";
import { useRef } from "react";
import { useMoodBackground } from "../components/utils/mood/useMoodBackground";
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
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();
  const theme = useThemeStore((s) => s.theme);

  const messagesRef = useRef(null);

  useMoodBackground(messages, authUser._id);

  return (
    <div ref={messagesRef} className="chat-container-outer h-screen">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="bg-white flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            <div className="bg-white flex-1 flex flex-col">
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer
                  startCall={startCall}
                  setCallType={setCallType}
                  setCalling={setCalling}
                  setCallActive={setCallActive}
                  setActiveCallUserId={setActiveCallUserId}
                  setActiveCallUserName={setActiveCallUserName}
                  setActiveCallUserAvatar={setActiveCallUserAvatar}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
