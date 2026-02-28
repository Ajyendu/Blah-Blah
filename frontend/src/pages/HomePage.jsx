import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import Sidebar from "../components/Sidebar";
import ChatListPanel from "../components/ChatListPanel";
import { useAuthStore } from "../store/useAuthStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useAudioCall } from "../store/useAudioCall";
import { useRef } from "react";
import "./Homepage.css";
import ChatNotes from "../components/ChatNotes";
import TruthDarePanel from "../components/TruthDarePanel";
import GamePlayingListener from "../components/GamePlayingListener";
import { useNoteStore } from "../store/useNoteStore";
import { useGameStore } from "../store/useGameStore";

const HomePage = ({
  setActiveCallUserAvatar,
  setActiveCallUserId,
  setActiveCallUserName,
  setCallActive,
  setCalling,
  startCall,
  setCallType,
}) => {
  const { isNotesOpen } = useNoteStore();
  const isTruthDareOpen = useGameStore((s) => s.isTruthDareOpen);

  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();
  const theme = useThemeStore((s) => s.theme);

  const messagesRef = useRef(null);

  return (
    // <div className="chat-container h-screen w-screen flex">
    <div className="app-shell h-screen w-screen flex">
      <GamePlayingListener />
      {/* CHAT SHELL */}
      <div className="flex flex-1 m-6 overflow-hidden app-card">
        {/* SIDEBAR (dark nav) */}
        <div className="flex-shrink-0">
          <Sidebar />
        </div>

        {/* Combined block: chat list + chatbox only (separate from Notes) */}
        <div className="app-content-wrap flex-1 flex min-w-0">
          <div className="flex-shrink-0">
            <ChatListPanel />
          </div>

          {/* MAIN CHAT (visible chatbox) */}
          <div className="flex-1 flex flex-col">
            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <div className="chat-layout">
                <ChatContainer
                  startCall={startCall}
                  setCallType={setCallType}
                  setCalling={setCalling}
                  setCallActive={setCallActive}
                  setActiveCallUserId={setActiveCallUserId}
                  setActiveCallUserName={setActiveCallUserName}
                  setActiveCallUserAvatar={setActiveCallUserAvatar}
                />
              </div>
            )}
          </div>
        </div>

        {/* Notes panel: separate block beside the combined chat block */}
        {isNotesOpen && <ChatNotes />}
        {/* Truth or Dare panel: same style as Notes */}
        {isTruthDareOpen && <TruthDarePanel />}
      </div>
    </div>
  );
};

export default HomePage;
