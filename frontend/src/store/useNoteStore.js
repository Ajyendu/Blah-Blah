import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useNoteStore = create((set, get) => ({
  notes: [],
  loading: false,
  isNotesOpen: false,
  noteIds: new Set(),

  setIsNotesOpen: (value) => set({ isNotesOpen: value }),

  /* ================= FETCH NOTES ================= */
  fetchNotes: async (chatId) => {
    try {
      set({ loading: true });

      const res = await axiosInstance.get(`/notes/${chatId}`);

      const ids = new Set(res.data.map((n) => n.messageId));

      set({
        notes: res.data.sort(
          (a, b) => new Date(a.messageCreatedAt) - new Date(b.messageCreatedAt)
        ),
        noteIds: ids,
        loading: false,
        isNotesOpen: true,
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
    }
  },

  /* ================= LOCAL CHECK ================= */
  isNote: (messageId) => {
    return get().noteIds.has(messageId);
  },
}));
