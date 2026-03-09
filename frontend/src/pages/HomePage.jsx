import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import Sidebar from "../components/Sidebar";
import ChatListPanel from "../components/ChatListPanel";
import { useAuthStore } from "../store/useAuthStore";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useRef } from "react";
import { useIsMobile } from "../hooks/useMediaQuery";
import "./Homepage.css";
import ChatNotes from "../components/ChatNotes";
import ChatDrawing from "../components/ChatDrawing";
import ChatVideoPanel from "../components/ChatVideoPanel";
import TruthDarePanel from "../components/TruthDarePanel";
import SlidableBottomSheet from "../components/SlidableBottomSheet";
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
  const { isNotesOpen, isDrawingOpen, isVideoPanelOpen, panelMinimized, setPanelMinimized, setIsNotesOpen, setIsDrawingOpen, setIsVideoPanelOpen } = useNoteStore();
  const isTruthDareOpen = useGameStore((s) => s.isTruthDareOpen);
  const gamePanelMinimized = useGameStore((s) => s.panelMinimized);
  const setGamePanelMinimized = useGameStore((s) => s.setPanelMinimized);
  const setTruthDareOpen = useGameStore((s) => s.setTruthDareOpen);

  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();
  const theme = useThemeStore((s) => s.theme);
  const isMobile = useIsMobile();

  const messagesRef = useRef(null);

  return (
    // <div className="chat-container h-screen w-screen flex">
    <div className="app-shell h-screen w-screen flex">
      <GamePlayingListener />
      {/* CHAT SHELL */}
      <div className="app-card flex flex-1 m-6 overflow-hidden">
        {/* SIDEBAR (dark nav) - desktop left, mobile bottom */}
        <div className="app-card__sidebar flex-shrink-0">
          <Sidebar />
        </div>

        {/* Combined block: chat list + chatbox (on mobile: show list OR chat, not both) */}
        <div
          className={`app-content-wrap app-card__main flex-1 flex min-w-0${!isMobile && selectedUser ? " app-content-wrap--chat-open" : ""}${isMobile && (isNotesOpen || isDrawingOpen || isVideoPanelOpen || isTruthDareOpen) ? " bottom-sheet-open" : ""}${isMobile && (isNotesOpen || isDrawingOpen || isVideoPanelOpen || isTruthDareOpen) && ((isNotesOpen || isDrawingOpen || isVideoPanelOpen) ? panelMinimized : gamePanelMinimized) ? " bottom-sheet-peek-visible" : ""}`}
        >
          {/* Chat list: hidden on mobile when a chat is selected */}
          {(!isMobile || !selectedUser) && (
            <div className="chat-list-panel-wrap flex-shrink-0">
              <ChatListPanel />
            </div>
          )}

          {/* MAIN CHAT: on mobile when chat selected, show only this; on mobile with no chat, hide so list is full width */}
          {(!isMobile || selectedUser) && (
            <div className="chat-main-wrap flex-1 flex flex-col">
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
          )}
        </div>

        {/* Mobile only: slidable bottom sheets for games, notes, watch together, drawing */}
        {isMobile && (
          <>
            {isNotesOpen && (
              <SlidableBottomSheet
                isMinimized={panelMinimized}
                onMinimizedChange={setPanelMinimized}
                onClose={() => setIsNotesOpen(false)}
                peekLabel="Notes"
              >
                <ChatNotes />
              </SlidableBottomSheet>
            )}
            {isDrawingOpen && (
              <SlidableBottomSheet
                isMinimized={panelMinimized}
                onMinimizedChange={setPanelMinimized}
                onClose={() => setIsDrawingOpen(false)}
                peekLabel="Drawing"
              >
                <ChatDrawing />
              </SlidableBottomSheet>
            )}
            {isVideoPanelOpen && (
              <SlidableBottomSheet
                isMinimized={panelMinimized}
                onMinimizedChange={setPanelMinimized}
                onClose={() => setIsVideoPanelOpen(false)}
                peekLabel="Watch Together"
              >
                <ChatVideoPanel />
              </SlidableBottomSheet>
            )}
            {isTruthDareOpen && (
              <SlidableBottomSheet
                isMinimized={gamePanelMinimized}
                onMinimizedChange={setGamePanelMinimized}
                onClose={() => setTruthDareOpen(false)}
                peekLabel="Truth or Dare"
              >
                <TruthDarePanel />
              </SlidableBottomSheet>
            )}
          </>
        )}

        {/* Desktop/laptop: panels inline (no sliding sheet) */}
        {!isMobile && isNotesOpen && (
          <div className="desktop-panel-wrap">
            <ChatNotes />
          </div>
        )}
        {!isMobile && isDrawingOpen && (
          <div className="desktop-panel-wrap">
            <ChatDrawing />
          </div>
        )}
        {!isMobile && isVideoPanelOpen && (
          <div className="desktop-panel-wrap">
            <ChatVideoPanel />
          </div>
        )}
        {!isMobile && isTruthDareOpen && (
          <div className="desktop-panel-wrap">
            <TruthDarePanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
