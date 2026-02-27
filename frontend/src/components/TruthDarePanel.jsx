import { useEffect } from "react";
import { X } from "lucide-react";
import { useGameStore } from "../store/useGameStore";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import TruthDareGame from "./games/truthDare/TruthDareGame";
import "./TruthDarePanel.css";

const TruthDarePanel = () => {
  const isTruthDareOpen = useGameStore((s) => s.isTruthDareOpen);
  const setIsTruthDareOpen = useGameStore((s) => s.setTruthDareOpen);
  const currentGameName = useGameStore((s) => s.currentGameName);
  const selectedChat = useChatStore((s) => s.selectedChat);
  const { socket, authUser } = useAuthStore();
  const otherParticipant = selectedChat?.participants?.find(
    (p) => String(p._id) !== String(authUser?._id)
  );
  const onlineUsers = useAuthStore((s) => s.onlineUsers);
  const gamePlayingUserIdByChat = useGameStore((s) => s.gamePlayingUserIdByChat);
  const gamePlayingGameNameByChat = useGameStore((s) => s.gamePlayingGameNameByChat);
  const otherUserInGame =
    selectedChat?._id &&
    gamePlayingUserIdByChat[selectedChat._id] &&
    String(gamePlayingUserIdByChat[selectedChat._id]) === String(otherParticipant?._id);
  const otherUserGameName = selectedChat?._id ? gamePlayingGameNameByChat[selectedChat._id] : null;

  useEffect(() => {
    if (!isTruthDareOpen || !selectedChat?._id || !otherParticipant || !socket) return;
    socket.emit("game_playing", {
      chatId: selectedChat._id,
      otherUserId: otherParticipant._id,
      gameName: currentGameName ?? "Truth or Dare",
      userName: authUser?.fullName,
      userAvatar: authUser?.profilePic,
    });
    return () => {
      socket.emit("game_left", {
        chatId: selectedChat._id,
        otherUserId: otherParticipant._id,
      });
    };
  }, [isTruthDareOpen, selectedChat?._id, otherParticipant?._id, socket, authUser?.fullName, authUser?.profilePic, currentGameName]);

  const sameGame = currentGameName && otherUserGameName && currentGameName === otherUserGameName;

  return (
    <div className="truth-dare-panel">
      <header className="truth-dare-panel__header">
        <button
          type="button"
          className="truth-dare-panel__close"
          onClick={() => setIsTruthDareOpen(false)}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </header>

      <div className="truth-dare-panel__body">
        <TruthDareGame />
      </div>

      {otherParticipant && otherUserInGame && (
        <footer className="truth-dare-panel__footer">
          <span className="truth-dare-panel__status">
            {sameGame ? (
              <>
                <span className="truth-dare-panel__dot truth-dare-panel__dot--online" />
                {otherParticipant.fullName} is online
              </>
            ) : (
              <>
                <span className="truth-dare-panel__dot truth-dare-panel__dot--playing" />
                {otherParticipant.fullName} is playing {otherUserGameName ?? "this game"}
              </>
            )}
          </span>
        </footer>
      )}
    </div>
  );
};

export default TruthDarePanel;
