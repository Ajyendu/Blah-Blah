import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { useNoteStore } from "./useNoteStore";
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
  /** When receiver rejects, we show "Request rejected" then clear after delay */
  rejectedChatId: null,
  /** chatId -> number of unseen messages (for sidebar badge: count of chats with unseen) */
  unreadCountByChatId: {},
  isScreenSharing: false,
  sendByCodeLoading: false,
  isChatsLoading: false,
  friendsChats: [],

  acceptChat: async (conversationId) => {
    await axiosInstance.post("/conversations/accept", {
      conversationId,
    });

    // 🔥 REFETCH chats from backend (SOURCE OF TRUTH)
    const res = await axiosInstance.get("/conversations/my");

    set((state) => {
      const updatedChats = res.data;
      const updatedSelectedChat = updatedChats.find(
        (c) => c._id === conversationId,
      );

      return {
        chats: updatedChats,
        selectedChat: updatedSelectedChat ?? state.selectedChat,
      };
    });
    get().getMyFriends();
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

  removeFriend: async (conversationId) => {
    try {
      const id =
        conversationId != null
          ? (typeof conversationId === "object" && conversationId?.toString
              ? conversationId.toString()
              : String(conversationId))
          : null;
      if (!id) {
        toast.error("Invalid conversation");
        return;
      }
      await axiosInstance.post("/conversations/remove", { conversationId: id });
      const res = await axiosInstance.get("/conversations/my");
      set((state) => {
        const updatedChats = res.data || [];
        const wasOpen = state.selectedChat?._id === id || state.selectedChat?._id === conversationId;
        const updatedSelected = updatedChats.find((c) => String(c._id) === String(id));
        return {
          chats: updatedChats,
          selectedChat: wasOpen && updatedSelected ? updatedSelected : (wasOpen ? null : state.selectedChat),
          selectedUser: wasOpen && updatedSelected
            ? (updatedSelected.participants?.find((u) => u && String(u._id ?? u) !== String(useAuthStore.getState().authUser?._id)) ?? null)
            : (wasOpen ? null : state.selectedUser),
          messages: wasOpen && !updatedSelected ? [] : state.messages,
        };
      });
      toast.success("Friend removed");
      get().getMyFriends();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to remove friend";
      toast.error(msg);
      // If 404, backend may be wrong URL — suggest checking VITE_BACKEND_URL
      if (err.response?.status === 404 && !err.response?.data?.message) {
        console.warn("Remove friend 404: check VITE_BACKEND_URL points to your backend (no /api suffix)");
      }
    }
  },

  getMyChats: async () => {
    set({ isChatsLoading: true });
    try {
      const res = await axiosInstance.get("/conversations/my");
      const updatedChats = res.data || [];
      set((state) => {
        const next = { chats: updatedChats };
        // Keep selectedChat in sync so "Request sent" / "Accept to chat" updates in real time
        if (state.selectedChat?._id) {
          const updatedSelected = updatedChats.find(
            (c) => String(c._id) === String(state.selectedChat._id),
          );
          if (updatedSelected) {
            next.selectedChat = updatedSelected;
            const authId = useAuthStore.getState().authUser?._id;
            next.selectedUser = updatedSelected.participants?.find(
              (u) => u && String(u._id ?? u) !== String(authId),
            ) ?? state.selectedUser;
          }
        }
        return next;
      });
    } catch (err) {
      toast.error("Failed to load chats");
    } finally {
      set({ isChatsLoading: false });
    }
  },
  getMyFriends: async () => {
    try {
      const res = await axiosInstance.get("/conversations/friends");
      set({ friendsChats: res.data || [] });
    } catch (err) {
      toast.error("Failed to load friends");
    }
  },
  ensureChatInList: (chat) => {
    if (!chat?._id) return;
    set((state) => {
      const exists = state.chats.some((c) => String(c._id) === String(chat._id));
      if (exists) return state;
      return { chats: [chat, ...state.chats] };
    });
  },
  startScreenShare: () => {
    set({ isScreenSharing: true });
    const socket = useAuthStore.getState().socket;
    socket.emit("start_screen_share");
  },

  stopScreenShare: () => {
    set({ isScreenSharing: false });
    const socket = useAuthStore.getState().socket;
    socket.emit("stop_screen_share");
  },

  setSelectedChat: (chat) =>
    set((state) => {
      const isSameChat = state.selectedChat?._id === chat?._id;
      if (isSameChat) return state; // avoid clearing messages on same-chat click
      const selectedUser = chat.participants.find(
        (u) => u._id !== useAuthStore.getState().authUser._id,
      );
      const nextUnread = { ...state.unreadCountByChatId };
      if (chat?._id) delete nextUnread[chat._id];
      return {
        selectedChat: chat,
        selectedUser,
        messages: [],
        unreadCountByChatId: nextUnread,
      };
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
      const id =
        typeof messageId === "object" && messageId?.toString
          ? messageId.toString()
          : messageId;
      await axiosInstance.delete(
        `/messages/delete/${id}?scope=${encodeURIComponent(scope)}`,
        {
          data: { scope },
        },
      );

      useNoteStore.getState().removeNoteByMessageId(id);

      if (scope === "me") {
        const idStr =
          typeof messageId === "object" && messageId?.toString
            ? messageId.toString()
            : String(messageId);
        set((state) => ({
          messages: state.messages.filter((m) => String(m._id) !== idStr),
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
      `/messages/conversation/${conversationId}`,
    );

    const messageList = res.data || [];
    set({ messages: messageList });

    const lastInChat = messageList.length > 0 ? messageList[messageList.length - 1] : null;
    set((state) => ({
      chats: state.chats.map((c) =>
        String(c._id) === String(conversationId)
          ? { ...c, lastMessage: lastInChat }
          : c,
      ),
    }));

    // Mark as seen only when tab is visible to the user
    if (
      typeof document !== "undefined" &&
      document.visibilityState !== "visible"
    )
      return;
    const authUser = useAuthStore.getState().authUser;
    const socket = useAuthStore.getState().socket;
    if (authUser?._id && socket) {
      socket.emit("chat_opened", {
        chatId: conversationId,
        userId: authUser._id,
      });
    }
  },

  sendMessageByCode: async ({ userCode, text }) => {
    set({ sendByCodeLoading: true });
    try {
      const res = await axiosInstance.post(
        "/messages/send-by-code",
        { userCode, text },
        { withCredentials: true },
      );
      const { chat } = res.data || {};
      if (chat) {
        set((state) => {
          const exists = state.chats.some((c) => c._id === chat._id);
          return {
            chats: exists
              ? state.chats.map((c) => (c._id === chat._id ? chat : c))
              : [chat, ...state.chats],
          };
        });
        get().setSelectedChat(chat);
      }
      return res.data;
    } finally {
      set({ sendByCodeLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    try {
      await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData,
        {
          maxContentLength: 50 * 1024 * 1024, // 50MB for base64 images
          maxBodyLength: 50 * 1024 * 1024,
          timeout: 60000,
        },
      );
      // Real-time update is via backend emitting new_message; only emit send_message for AI when no image
      const socket = useAuthStore.getState().socket;
      socket.emit("join_chat", { chatId: messageData.conversationId });
      if (!messageData.image) {
        socket.emit("send_message", {
          chatId: messageData.conversationId,
          message: messageData.text,
        });
      }
      // So zero-message conversations appear in the panel after first send
      get().getMyChats();
    } catch (error) {
      console.error("Send failed:", error);
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  markMessageRevealed: (messageId) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m._id === messageId ? { ...m, revealed: true } : m,
      ),
    })),

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // ✅ ALWAYS clean before re-attaching
    socket.off("messagesSeen");
    socket.off("messageSeen");
    socket.off("newMessage");
    socket.off("newChatMessage");
    socket.off("messageDeletedForEveryone");
    socket.off("message-revealed");
    socket.off("chat_seen_update");

    socket.on("chat_seen_update", ({ chatId, seenAt }) => {
      const authId = useAuthStore.getState().authUser?._id;
      set((state) => ({
        messages: state.messages.map((m) =>
          String(m.chatId) === String(chatId) &&
          String(m.senderId) === String(authId)
            ? { ...m, seen: true, seenAt }
            : m,
        ),
      }));
    });

    socket.on("messageSeen", ({ messageId, seenAt }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          String(m._id) === String(messageId)
            ? { ...m, seen: true, seenAt }
            : m,
        ),
      }));
    });

    socket.on("new_message", (data) => {
      const msg = data.message ?? data;
      const authId = useAuthStore.getState().authUser?._id;
      set((state) => {
        const isForCurrentChat =
          state.selectedChat &&
          String(state.selectedChat._id) === String(msg.chatId);
        const isFromOther =
          msg.senderId && String(msg.senderId) !== String(authId);
        const isToMe =
          msg.receiverId && String(msg.receiverId) === String(authId);
        const nextUnread = { ...state.unreadCountByChatId };
        if (isToMe && isFromOther && !isForCurrentChat && msg.chatId) {
          const cid = String(msg.chatId);
          nextUnread[cid] = (nextUnread[cid] ?? 0) + 1;
        }
        const chatId = msg.chatId != null ? String(msg.chatId) : null;
        let nextChats = state.chats;
        if (chatId) {
          const updated = state.chats.find((c) => String(c._id) === chatId);
          const updatedChat = updated
            ? {
                ...updated,
                lastMessage: msg,
                updatedAt: msg.createdAt || updated.updatedAt,
              }
            : null;
          if (updatedChat) {
            nextChats = [
              updatedChat,
              ...state.chats.filter((c) => String(c._id) !== chatId),
            ];
          }
        }
        return {
          messages: isForCurrentChat
            ? [...state.messages, msg]
            : state.messages,
          unreadCountByChatId: nextUnread,
          chats: nextChats,
        };
      });
      // When chat is visible (tab in focus) and message is for me in current chat, mark as seen
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "visible" &&
        msg.chatId &&
        authId &&
        String(msg.receiverId) === String(authId)
      ) {
        const state = get();
        if (
          state.selectedChat &&
          String(state.selectedChat._id) === String(msg.chatId)
        ) {
          socket.emit("chat_opened", { chatId: msg.chatId, userId: authId });
        }
      }
    });

    socket.on("messageDeletedForEveryone", ({ messageId, deletedBy }) => {
      useNoteStore.getState().removeNoteByMessageId(messageId);
      set((state) => ({
        messages: state.messages.map((m) =>
          m._id === messageId
            ? { ...m, deleted: true, deletedBy, text: "" }
            : m,
        ),
      }));
    });
  },
  markChatSeen: (chatId, seenAt) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        String(m.chatId) === String(chatId) ? { ...m, seen: true, seenAt } : m,
      ),
    })),

  subscribeToChatEvents: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newChatMessage");

    socket.on("chatRejected", ({ conversationId }) => {
      const { selectedChat } = get();
      const isSelected = selectedChat && String(selectedChat._id) === String(conversationId);

      if (isSelected) {
        // Show "Request rejected" in chatbox first; remove chat after delay
        set({ rejectedChatId: conversationId });
        setTimeout(() => {
          set((state) => ({
            chats: state.chats.filter((c) => String(c._id) !== String(conversationId)),
            selectedChat: null,
            selectedUser: null,
            messages: [],
            rejectedChatId: null,
          }));
        }, 2500);
        return;
      }

      set((state) => ({
        chats: state.chats.filter((c) => c._id !== conversationId),
        selectedChat: state.selectedChat,
        messages: state.messages,
        selectedUser: state.selectedUser,
      }));
    });

    socket.on("chatUnaccepted", () => {
      get().getMyChats();
      get().getMyFriends();
    });

    socket.on("chatAccepted", () => {
      get().getMyChats();
      get().getMyFriends();
    });

    socket.on("ai_private_reply", (data) => {
      set((state) => ({
        messages: [...state.messages, data],
      }));
    });

    socket.on("newChatMessage", ({ chat, message }) => {
      const authId = useAuthStore.getState().authUser?._id;
      set((state) => {
        const exists = state.chats.some((c) => c._id === chat._id);
        const isForCurrentChat =
          state.selectedChat &&
          String(state.selectedChat._id) === String(chat._id);
        const isFromOther =
          message?.senderId && String(message.senderId) !== String(authId);
        const nextUnread = { ...state.unreadCountByChatId };
        if (message && isFromOther && !isForCurrentChat && chat._id) {
          const cid = String(chat._id);
          nextUnread[cid] = (nextUnread[cid] ?? 0) + 1;
        }
        return {
          chats: exists
            ? state.chats.map((c) => (c._id === chat._id ? chat : c))
            : [chat, ...state.chats],
          unreadCountByChatId: nextUnread,
        };
      });
    });
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  clearSelectedChat: () =>
    set({ selectedChat: null, selectedUser: null, messages: [] }),

  /** Delete all messages in the current conversation for my account only (scope "me"). Other user still sees them. */
  clearMessagesForCurrentChat: async () => {
    const state = get();
    const msgs = [...(state.messages || [])];
    const currentChatId = state.selectedChat?._id != null ? String(state.selectedChat._id) : null;
    set({
      messages: [],
      chats: currentChatId
        ? state.chats.map((c) =>
            String(c._id) === currentChatId ? { ...c, lastMessage: null } : c,
          )
        : state.chats,
    });
    let failed = 0;
    for (const m of msgs) {
      try {
        const id = m._id != null ? String(m._id) : m._id;
        if (!id) continue;
        await axiosInstance.delete(`/messages/delete/${id}?scope=me`, {
          data: { scope: "me" },
        });
        useNoteStore.getState().removeNoteByMessageId(id);
      } catch {
        failed += 1;
      }
    }
    if (failed === 0) {
      toast.success("Conversation cleared for you. The other person can still see the messages.");
      // Remove conversation from panel and close it
      set((s) => ({
        chats: currentChatId ? s.chats.filter((c) => String(c._id) !== currentChatId) : s.chats,
        selectedChat: null,
        selectedUser: null,
        messages: [],
      }));
    }
  },
}));
