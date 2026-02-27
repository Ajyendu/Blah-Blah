import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useGameStore } from "../store/useGameStore";

export default function GamePlayingListener() {
  const socket = useAuthStore((s) => s.socket);

  useEffect(() => {
    if (!socket) return;

    const handleGamePlaying = ({ chatId, userId, gameName }) => {
      const name = gameName ?? "Truth or Dare";
      useGameStore.getState().setGamePlayingInChat(chatId, userId, name);
    };

    const handleGameLeft = ({ chatId }) => {
      useGameStore.getState().setGamePlayingInChat(chatId, null);
    };

    socket.on("game_playing", handleGamePlaying);
    socket.on("game_left", handleGameLeft);
    return () => {
      socket.off("game_playing", handleGamePlaying);
      socket.off("game_left", handleGameLeft);
    };
  }, [socket]);

  return null;
}
