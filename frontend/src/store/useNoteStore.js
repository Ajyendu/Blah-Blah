import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useNoteStore = create((set, get) => ({
  notes: [],
  loading: false,
  isNotesOpen: false,
  isDrawingOpen: false,
  isVideoPanelOpen: false,
  /** Bottom sheet minimized (only top 10% visible) for Notes/Drawing/Watch */
  panelMinimized: false,
  /** Width in px for the video panel (resizable) */
  videoPanelWidth: 280,
  /** When set, ChatVideoPanel will use this as the initial URL and clear it (e.g. from bookmarklet) */
  pendingYoutubeUrl: null,
  /** chatId -> userId of the other user who has the drawing panel open */
  drawingUserIdByChat: {},
  /** chatId -> userId of the other user who has the Watch Party panel open */
  videoUserIdByChat: {},
  /** chatId -> YouTube URL synced from the other user's Watch Party */
  watchPartyYoutubeUrlByChat: {},
  /** chatId -> local video URL synced from the other user (uploaded and shared) */
  watchPartyLocalVideoUrlByChat: {},
  /** chatId -> { youtube?: { currentTime, isPaused }, local?: { currentTime, isPaused } } for resume when returning to Watch Party */
  watchPartyResumeByChat: {},
  /** chatId -> true when the other user clicked Clear (so we clear our local video/url state too) */
  watchPartyClearedByOtherByChat: {},
  /** chatId -> imageData (synced canvas from other device, e.g. after undo/redo/clear) */
  pendingDrawingCanvasByChat: {},
  noteIds: new Set(),

  setIsNotesOpen: (value) => set({ isNotesOpen: value, panelMinimized: value ? false : get().panelMinimized }),
  setIsDrawingOpen: (value) => set({ isDrawingOpen: value, panelMinimized: value ? false : get().panelMinimized }),
  setIsVideoPanelOpen: (value) => set({ isVideoPanelOpen: value, panelMinimized: value ? false : get().panelMinimized }),
  setPanelMinimized: (value) => set({ panelMinimized: !!value }),
  setVideoPanelWidth: (width) => set({ videoPanelWidth: Math.min(600, Math.max(240, width)) }),
  setPendingYoutubeUrl: (url) => set({ pendingYoutubeUrl: url }),

  setDrawingInChat: (chatId, userId) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      const next = { ...state.drawingUserIdByChat };
      if (userId == null) delete next[key];
      else next[key] = userId != null ? String(userId) : userId;
      return { drawingUserIdByChat: next };
    }),

  setVideoInChat: (chatId, userId) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      const next = { ...state.videoUserIdByChat };
      if (userId == null) delete next[key];
      else next[key] = userId != null ? String(userId) : userId;
      return { videoUserIdByChat: next };
    }),

  setWatchPartyYoutubeUrl: (chatId, url) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      const next = { ...state.watchPartyYoutubeUrlByChat };
      if (url == null || url === "") delete next[key];
      else next[key] = url;
      return { watchPartyYoutubeUrlByChat: next };
    }),

  setWatchPartyLocalVideoUrl: (chatId, url) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      const next = { ...state.watchPartyLocalVideoUrlByChat };
      if (url == null || url === "") delete next[key];
      else next[key] = url;
      return { watchPartyLocalVideoUrlByChat: next };
    }),

  setWatchPartyResume: (chatId, source, currentTime, isPaused) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key || (source !== "youtube" && source !== "local")) return state;
      const next = { ...state.watchPartyResumeByChat };
      const entry = next[key] ?? {};
      next[key] = {
        ...entry,
        [source]: {
          currentTime: typeof currentTime === "number" && currentTime >= 0 ? currentTime : 0,
          isPaused: !!isPaused,
        },
      };
      return { watchPartyResumeByChat: next };
    }),

  setWatchPartyClearedByOther: (chatId, value) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      const next = { ...state.watchPartyClearedByOtherByChat };
      if (value) next[key] = true;
      else delete next[key];
      return { watchPartyClearedByOtherByChat: next };
    }),

  setPendingDrawingCanvas: (chatId, imageData) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      return {
        pendingDrawingCanvasByChat: { ...state.pendingDrawingCanvasByChat, [key]: imageData },
      };
    }),

  clearPendingDrawingCanvas: (chatId) =>
    set((state) => {
      const key = chatId != null ? String(chatId) : null;
      if (!key) return state;
      const next = { ...state.pendingDrawingCanvasByChat };
      delete next[key];
      return { pendingDrawingCanvasByChat: next };
    }),

  /* ================= FETCH NOTES ================= */
  fetchNotes: async (chatId) => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get(`/notes/${chatId}`);

      const ids = new Set(res.data.map((n) => n.messageId));

      set({
        notes: res.data.sort(
          (a, b) => new Date(a.messageCreatedAt) - new Date(b.messageCreatedAt),
        ),
        noteIds: ids,
        loading: false,
      });
    } catch (err) {
      console.error("fetchNotes error:", err);
      set({ loading: false });
    }
  },

  /* ================= TOGGLE NOTE ================= */
  toggleNote: async ({ chatId, messageId }) => {
    try {
      const res = await axiosInstance.post("/notes/toggle", {
        chatId,
        messageId,
      });

      const currentNotes = get().notes;
      const currentIds = new Set(get().noteIds);

      if (res.data.saved) {
        currentIds.add(messageId);

        set({
          notes: [...currentNotes, res.data.note],
          noteIds: currentIds,
        });
      } else {
        currentIds.delete(messageId);

        set({
          notes: currentNotes.filter((n) => n.messageId !== messageId),
          noteIds: currentIds,
        });
      }
    } catch (err) {
      console.error("toggleNote error:", err);
      const msg = err.response?.data?.message;
      if (msg) toast.error(msg);
    }
  },

  /* ================= LOCAL CHECK ================= */
  isNote: (messageId) => {
    return get().noteIds.has(messageId);
  },

  /* ================= REMOVE NOTE WHEN MESSAGE DELETED ================= */
  removeNoteByMessageId: async (messageId) => {
    const id =
      typeof messageId === "object" && messageId?.toString
        ? messageId.toString()
        : String(messageId);
    const note = get().notes.find((n) => String(n.messageId) === id);
    if (!note) {
      set((state) => {
        const nextNotes = state.notes.filter((n) => String(n.messageId) !== id);
        const nextIds = new Set(state.noteIds);
        nextIds.delete(id);
        return { notes: nextNotes, noteIds: nextIds };
      });
      return;
    }
    try {
      await axiosInstance.delete(`/notes/${note._id}`);
    } catch (err) {
      console.error("removeNoteByMessageId API error:", err);
    }
    set((state) => {
      const nextNotes = state.notes.filter((n) => String(n.messageId) !== id);
      const nextIds = new Set(state.noteIds);
      nextIds.delete(id);
      return { notes: nextNotes, noteIds: nextIds };
    });
  },
}));
