import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { useAudioCall } from "../store/useAudioCall";
import { useState } from "react";
import { useNoteStore } from "../store/useNoteStore";
import TruthDareGame from "./games/truthDare/TruthDareGame";
import "./mood.css";
import React from "react";
import ChatDNA from "./utils/mood/ChatDNA/ChatDNA";

const ChatHeader = ({
  setCalling,
  setCallType,
  setCallActive,
  setActiveCallUserId,
  setActiveCallUserName,
  setActiveCallUserAvatar,
}) => {
  const { selectedUser } = useChatStore();
  const { selectedChat } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const theme = useThemeStore((s) => s.theme);
  const { startCall } = useAudioCall(); // ✅ ONLY this from hook
  const { isNotesOpen, setIsNotesOpen } = useNoteStore();
  const [showGame, setShowGame] = useState(false);
  const [showDNA, setShowDNA] = useState(false);

  // const startScreenShare = useChatStore((s) => s.startScreenShare);
  // const stopScreenShare = useChatStore((s) => s.stopScreenShare);
  // const isScreenSharing = useChatStore((s) => s.isScreenSharing);

  return (
    <div className="p-2.5 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 style={{ color: theme.textPrimary }}>
              {selectedUser.fullName}
            </h3>
            <p style={{ color: theme.textPrimary }}>
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            startCall(selectedUser._id, "video");
            setCallType("video");
            setCalling(true);
            setActiveCallUserId(selectedUser._id);
            setActiveCallUserName(selectedUser.fullName);
            setActiveCallUserAvatar(selectedUser.profilePic);
          }}
        >
          🎥
        </button>

        {/* 📞 CALL */}
        <button
          onClick={() => {
            startCall(selectedUser._id, "audio");
            setCallType("audio");
            setCalling(true);
            // 🔥 UI STATE SET HERE (VALID FUNCTIONS)
            setActiveCallUserId(selectedUser._id);
            setActiveCallUserName(selectedUser.fullName);
            setActiveCallUserAvatar(selectedUser.profilePic);
          }}
        >
          📞
        </button>
        <button onClick={() => setShowDNA(true)}>🧬 Chat DNA</button>
        {showDNA && (
          <div className="game-overlay">
            <ChatDNA chatId={selectedChat._id} />
            <button className="close-game" onClick={() => setShowDNA(false)}>
              ✖
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setIsNotesOpen(!isNotesOpen);
          }}
          title="Screen Share"
        >
          📝
        </button>
        <button onClick={() => setShowGame(true)}>🍾</button>
        {showGame && (
          <div className="game-overlay">
            <TruthDareGame />
            <button className="close-game" onClick={() => setShowGame(false)}>
              ✖
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
