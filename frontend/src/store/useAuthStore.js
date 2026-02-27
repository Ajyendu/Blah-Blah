import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore.js";
import { useNoteStore } from "./useNoteStore.js";
import { useGameStore } from "./useGameStore.js";

function closeAllPanels() {
  useNoteStore.getState().setIsNotesOpen(false);
  useGameStore.getState().setTruthDareOpen(false);
  useChatStore.getState().clearSelectedChat();
}

export const useAuthStore = create((set, get) => ({
  authUser: null,
  token: localStorage.getItem("token"), // ✅ STORE TOKEN
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // ================= CHECK AUTH =================
  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;
      }

      const res = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });

      set({ authUser: res.data });
      closeAllPanels();
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // ================= SIGNUP =================
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);

      const { user, token } = res.data; // ✅ GET TOKEN

      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;

      set({ authUser: user, token });
      closeAllPanels();
      toast.success("Account created successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // ================= LOGIN =================
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      const { user, token } = res.data; // ✅ GET TOKEN

      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;

      set({ authUser: user, token });
      closeAllPanels();
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // ================= LOGOUT =================
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];

      set({ authUser: null, token: null });
      toast.success("Logged out successfully");
      const socket = get().socket;
      socket?.off();
      socket?.disconnect();
      set({
        messages: [],
        chats: [],
        selectedChat: null,
        selectedUser: null,
      });

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  // ================= DELETE ACCOUNT =================
  deleteAccount: async () => {
    try {
      await axiosInstance.post("/auth/delete-account", {}, { withCredentials: true });
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      set({ authUser: null, token: null });
      const socket = get().socket;
      socket?.off();
      socket?.disconnect();
      get().disconnectSocket();
      toast.success("Account deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
      throw err;
    }
  },

  // ================= UPDATE PROFILE =================
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // ================= SOCKET =================
  connectSocket: () => {
    const { authUser, token } = get();

    if (!authUser || !token) {
      console.log("⛔ No authUser or token, skipping socket connect");
      return;
    }

    if (!authUser || get().socket) return;

    console.log("🔐 Connecting socket with token:", token);

    const backendUrl =
      (import.meta.env.VITE_BACKEND_URL || "").trim() ||
      "http://localhost:5050";
    const socket = io(backendUrl, {
      auth: { token },
    });

    window.socket = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);

      const chatStore = useChatStore.getState();
      chatStore.subscribeToMessages();
    });

    socket.on("connect_error", (err) => {
      console.error("❌ SOCKET CONNECT ERROR:", err.message);
    });

    socket.on("getOnlineUsers", (userIds) => {
      const normalized = Array.isArray(userIds)
        ? userIds.map((id) => String(id))
        : [];
      set({ onlineUsers: normalized });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));
