import { create } from "zustand";
import toast from "react-hot-toast";
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
