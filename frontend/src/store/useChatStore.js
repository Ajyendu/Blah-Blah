import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
let listenersAttached = false;
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  chats: [],
  selectedChat: null,
  lastSeenAtByConversation: {},

  acceptChat: async (conversationId) => {
    await axiosInstance.post("/conversations/accept", {
      conversationId,
    });

    // 🔥 REFETCH chats from backend (SOURCE OF TRUTH)
    const res = await axiosInstance.get("/conversations/my");

    set((state) => {
      const updatedChats = res.data;
      const updatedSelectedChat = updatedChats.find(
        (c) => c._id === conversationId
      );

      return {
        chats: updatedChats,
        selectedChat: updatedSelectedChat ?? state.selectedChat,
      };
    });
  },

  rejectChat: async (conversationId) => {
    await axiosInstance.post("/conversations/reject", {
      conversationId,
    });

    set((state) => {
      const wasOpen = state.selectedChat?._id === conversationId;

      return {
        chats: state.chats.filter((c) => c._id !== conversationId),

        // 🔥 HARD RESET if this chat was open
        selectedChat: wasOpen ? null : state.selectedChat,
        selectedUser: wasOpen ? null : state.selectedUser,
        messages: wasOpen ? [] : state.messages,
      };
    });

    toast.success("Chat rejected");
  },

  getMyChats: async () => {
    try {
      const res = await axiosInstance.get("/conversations/my");
      set({ chats: res.data });
    } catch (err) {
      toast.error("Failed to load chats");
    }
  },

  setSelectedChat: (chat) =>
    set({
      selectedChat: chat,
      selectedUser: chat.participants.find(
        (u) => u._id !== useAuthStore.getState().authUser._id
      ),
      messages: [],
    }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  deleteMessage: async (messageId, scope) => {
    try {
      await axiosInstance.delete(`/messages/delete/${messageId}`, {
        data: { scope }, // 🔥 REQUIRED
      });

      if (scope === "me") {
        set((state) => ({
          messages: state.messages.filter((m) => m._id !== messageId),
        }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  },

  getMessagesByConversation: async (conversationId) => {
    if (!conversationId) {
      set({ messages: [] });
      return;
    }

    const res = await axiosInstance.get(
      `/messages/conversation/${conversationId}`
    );

    set({ messages: res.data });
  },

  sendMessageByCode: async ({ userCode, text }) => {
    try {
      const res = await axiosInstance.post(
        "/messages/send-by-code",
        { userCode, text },
        { withCredentials: true }
      );
      console.log("📤 EMITTING TO:", receiver._id.toString());
      console.log("📤 SOCKET ID:", receiverSocket);
      // ❌ NEVER clear messages here
      return res.data;
    } catch (err) {
      console.error("sendMessageByCode failed:", err);
      throw err;
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    try {
      await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      // ❌ DO NOT update state here
      // socket will handle it
      const socket = useAuthStore.getState().socket;
      socket.emit("join_chat", { chatId: messageData.conversationId });
    } catch (error) {
      console.error("Send failed:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  markMessageRevealed: (messageId) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m._id === messageId ? { ...m, revealed: true } : m
      ),
    })),

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // ✅ ALWAYS clean before re-attaching
    socket.off("messagesSeen");
    socket.off("newMessage");
    socket.off("newChatMessage");
    socket.off("messageDeletedForEveryone");
    socket.off("message-revealed");
    socket.off("chat_seen_update");

    socket.on("chat_seen_update", ({ chatId, seenAt }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          String(m.chatId) === String(chatId) ? { ...m, seen: true, seenAt } : m
        ),
      }));
    });

    // socket.on("messagesSeen", ({ conversationId, seenAt }) => {
    //   set((state) => ({
    //     lastSeenAtByConversation: {
    //       ...state.lastSeenAtByConversation,
    //       [conversationId]: seenAt,
    //     },
    //     messages: state.messages.map((m) =>
    //       m.conversationId === conversationId &&
    //       m.senderId === state.authUser._id
    //         ? { ...m, seenAt: m.seenAt ?? seenAt }
    //         : m
    //     ),
    //   }));
    // });

    socket.on("new_message", (data) => {
      set((state) => ({
        messages: [...state.messages, data.message ?? data],
      }));
    });

    // socket.on("newMessage", (newMessage) => {
    //   set((state) => {
    //     const seenAt =
    //       state.lastSeenAtByConversation[newMessage.conversationId];

    //     return {
    //       messages: [
    //         ...state.messages,
    //         seenAt && newMessage.senderId === state.authUser._id
    //           ? { ...newMessage, seenAt }
    //           : newMessage,
    //       ],
    //     };
    //   });
    // });

    socket.on("messageDeletedForEveryone", ({ messageId, deletedBy }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m._id === messageId ? { ...m, deleted: true, deletedBy, text: "" } : m
        ),
      }));
    });
  },
  markChatSeen: (chatId, seenAt) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        String(m.chatId) === String(chatId) ? { ...m, seen: true, seenAt } : m
      ),
    })),

  // markMessagesSeen: (conversationId) => {
  //   const socket = useAuthStore.getState().socket;
  //   const authUserId = useAuthStore.getState().authUser?._id;

  //   if (!socket || !authUserId) return;

  //   const now = new Date().toISOString();

  //   // optimistic update
  //   set((state) => ({
  //     messages: state.messages.map((m) =>
  //       m.conversationId === conversationId &&
  //       m.senderId !== authUserId &&
  //       !m.seenAt
  //         ? { ...m, seenAt: now }
  //         : m
  //     ),
  //   }));

  //   socket.emit("mark_messages_seen", { conversationId });
  // },

  subscribeToChatEvents: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newChatMessage");

    socket.on("chatRejected", ({ conversationId }) => {
      const { selectedChat } = get();

      set((state) => {
        const updatedChats = state.chats.filter(
          (c) => c._id !== conversationId
        );

        // 🔥 CRITICAL PART
        const shouldCloseChat =
          selectedChat && selectedChat._id === conversationId;

        return {
          chats: updatedChats,
          selectedChat: shouldCloseChat ? null : state.selectedChat,
          messages: shouldCloseChat ? [] : state.messages,
          selectedUser: shouldCloseChat ? null : state.selectedUser,
        };
      });
    });

    socket.on("newChatMessage", ({ chat, message }) => {
      set((state) => {
        const exists = state.chats.some((c) => c._id === chat._id);

        return {
          chats: exists
            ? state.chats.map((c) => (c._id === chat._id ? chat : c))
            : [chat, ...state.chats],
        };
      });
    });
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
