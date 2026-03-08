import { create } from "zustand";

export const useGameStore = create((set) => ({
  isTruthDareOpen: false,
  /** Bottom sheet minimized for Truth or Dare panel */
  panelMinimized: false,
  /** Current tab name for sync: "Spin the bottle" | "Flip the coin" | "Roll the die" */
  currentGameName: null,
  /** { chatId, userId, userName, userAvatar, gameName } when the other user is playing; clear on join or dismiss */
  gamePlayingNotification: null,
  /** chatId -> userId of the user currently in the game panel (for "Playing" badge) */
  gamePlayingUserIdByChat: {},
  /** chatId -> game name string for in-chat indicator */
  gamePlayingGameNameByChat: {},
  /** When opening panel from "Join", switch to this tab: 0 = bottle, 1 = coin, 2 = dice */
  openToGameIndex: null,

  setTruthDareOpen: (value) =>
    set((s) => ({ isTruthDareOpen: !!value, panelMinimized: value ? false : s.panelMinimized })),
  setPanelMinimized: (value) => set({ panelMinimized: !!value }),

  setOpenToGameIndex: (index) =>
    set({ openToGameIndex: index >= 0 && index <= 2 ? index : null }),

  setCurrentGameName: (name) => set({ currentGameName: name ?? null }),

  setGamePlayingNotification: (payload) =>
    set({ gamePlayingNotification: payload ?? null }),

  setGamePlayingInChat: (chatId, userId, gameName) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      const nextIds = { ...state.gamePlayingUserIdByChat };
      const nextNames = { ...state.gamePlayingGameNameByChat };
      if (userId == null) {
        delete nextIds[key];
        delete nextNames[key];
      } else {
        nextIds[key] = userId != null ? String(userId) : userId;
        nextNames[key] = gameName ?? "Truth or Dare";
      }
      return { gamePlayingUserIdByChat: nextIds, gamePlayingGameNameByChat: nextNames };
    }),
}));
