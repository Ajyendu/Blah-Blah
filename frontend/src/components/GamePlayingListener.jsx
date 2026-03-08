import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useGameStore } from "../store/useGameStore";
import { useNoteStore } from "../store/useNoteStore";

export default function GamePlayingListener() {
  const socket = useAuthStore((s) => s.socket);

  useEffect(() => {
    if (!socket) return;

    const handleGamePlaying = ({ chatId, userId, gameName }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useGameStore.getState().setGamePlayingInChat(key, userId != null ? String(userId) : userId, gameName);
    };

    const handleGameLeft = ({ chatId }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useGameStore.getState().setGamePlayingInChat(key, null);
    };

    const handleDrawingPlaying = ({ chatId, userId }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useNoteStore.getState().setDrawingInChat(key, userId != null ? String(userId) : userId);
    };

    const handleDrawingLeft = ({ chatId }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useNoteStore.getState().setDrawingInChat(key, null);
    };

    const handleWatchPartyPlaying = ({ chatId, userId }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useNoteStore.getState().setVideoInChat(key, userId != null ? String(userId) : userId);
    };

    const handleWatchPartyLeft = ({ chatId }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useNoteStore.getState().setVideoInChat(key, null);
    };

    const handleWatchPartyYoutubeUrl = ({ chatId, url }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useNoteStore.getState().setWatchPartyYoutubeUrl(key, url ?? "");
    };

    const handleWatchPartyLocalVideoUrl = ({ chatId, url }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) useNoteStore.getState().setWatchPartyLocalVideoUrl(key, url ?? "");
    };

    const handleWatchPartyClear = ({ chatId }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key) {
        useNoteStore.getState().setWatchPartyYoutubeUrl(key, null);
        useNoteStore.getState().setWatchPartyLocalVideoUrl(key, null);
        useNoteStore.getState().setWatchPartyClearedByOther(key, true);
      }
    };

    const handleDrawingCanvasState = ({ chatId, imageData }) => {
      const key = chatId != null ? String(chatId) : null;
      if (key && typeof imageData === "string") {
        useNoteStore.getState().setPendingDrawingCanvas(key, imageData);
      }
    };

    const requestCanvasFromSender = ({ chatId, fromUserId }) => {
      if (chatId == null || fromUserId == null) return;
      socket.emit("drawing_request_canvas_state", {
        chatId: String(chatId),
        requestToUserId: String(fromUserId),
      });
    };

    socket.on("game_playing", handleGamePlaying);
    socket.on("game_left", handleGameLeft);
    socket.on("drawing_playing", handleDrawingPlaying);
    socket.on("drawing_left", handleDrawingLeft);
    socket.on("watch_party_playing", handleWatchPartyPlaying);
    socket.on("watch_party_left", handleWatchPartyLeft);
    socket.on("watch_party_youtube_url", handleWatchPartyYoutubeUrl);
    socket.on("watch_party_local_video_url", handleWatchPartyLocalVideoUrl);
    socket.on("watch_party_clear", handleWatchPartyClear);
    socket.on("drawing_canvas_state", handleDrawingCanvasState);
    socket.on("drawing_undo", requestCanvasFromSender);
    socket.on("drawing_redo", requestCanvasFromSender);
    socket.on("drawing_clear", requestCanvasFromSender);
    return () => {
      socket.off("game_playing", handleGamePlaying);
      socket.off("game_left", handleGameLeft);
      socket.off("drawing_playing", handleDrawingPlaying);
      socket.off("drawing_left", handleDrawingLeft);
      socket.off("watch_party_playing", handleWatchPartyPlaying);
      socket.off("watch_party_left", handleWatchPartyLeft);
      socket.off("watch_party_youtube_url", handleWatchPartyYoutubeUrl);
      socket.off("watch_party_local_video_url", handleWatchPartyLocalVideoUrl);
      socket.off("watch_party_clear", handleWatchPartyClear);
      socket.off("drawing_canvas_state", handleDrawingCanvasState);
      socket.off("drawing_undo", requestCanvasFromSender);
      socket.off("drawing_redo", requestCanvasFromSender);
      socket.off("drawing_clear", requestCanvasFromSender);
    };
  }, [socket]);

  return null;
}
