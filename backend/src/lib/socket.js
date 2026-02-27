import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { detectBotMention } from "./detectBot.js";
import { generateAIReply } from "../AI/aiService.js";
import ChatMemory from "../models/chatMemory.model.js";
import { extractMemory } from "../AI/memoryExtractor.js";

let io;

/**
 * userId -> Set(socketId)
 */
const userSocketMap = new Map();

export const initSocket = (server) => {
  const allowedOrigins = [
    "http://localhost:8081",
    "https://localhost:8081",
    "http://localhost:8080",
    "https://localhost:8080", // Vite dev with HTTPS (mkcert)
    "http://localhost:5050",
    "http://localhost:5173", // Vite dev
    ...(process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.split(",")
          .map((o) => o.trim())
          .filter(Boolean)
      : []),
  ];
  io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(null, false);
      },
      credentials: true,
    },
  });

  // ================= AUTH =================
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        console.error("❌ socket auth: token missing");
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select(
        "_id fullName profilePic",
      );

      if (!user) {
        console.error("❌ socket auth: user not found");
        return next(new Error("Unauthorized"));
      }

      socket.userId = user._id.toString();
      socket.userName = user.fullName;
      socket.userAvatar = user.profilePic;

      console.log("👤 socket auth OK:", socket.userId);
      next();
    } catch (err) {
      console.error("❌ socket auth error:", err.message);
      next(new Error("Unauthorized"));
    }
  });

  // ================= CONNECTION =================
  io.on("connection", (socket) => {
    console.log("🟢 socket connected:", socket.id, socket.userId);

    const sockets = userSocketMap.get(socket.userId) || new Set();
    sockets.add(socket.id);
    userSocketMap.set(socket.userId, sockets);

    socket.join(socket.userId);

    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

    socket.on("disconnect", () => {
      console.log("🔴 socket disconnected:", socket.id);

      const set = userSocketMap.get(socket.userId);
      if (set) {
        set.delete(socket.id);
        if (set.size === 0) {
          userSocketMap.delete(socket.userId);
        }
      }

      io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    });

    socket.on("send_message", async ({ chatId, message }) => {
      try {
        // 1️⃣ Detect @Buddy
        const cleanMessage = detectBotMention(message);

        if (!cleanMessage) return; // No AI trigger

        // 2️⃣ Generate AI reply
        const aiReply = await generateAIReply(cleanMessage);

        // 3️⃣ Send PRIVATE reply only to this user
        socket.emit("ai_private_reply", {
          chatId,
          message: aiReply,
          sender: {
            _id: "buddy",
            fullName: "Buddy",
            profilePic: null,
          },
          private: true,
          createdAt: new Date(),
        });
      } catch (error) {
        console.error("AI error:", error.message);
      }
    });

    // ================= CALL =================
    socket.on("call-user", ({ to, offer, callType }) => {
      const toId = to != null ? String(to) : null;
      if (!toId) return;
      const receiverSockets = userSocketMap.get(toId);
      if (!receiverSockets) return;

      for (const sid of receiverSockets) {
        io.to(sid).emit("incoming-call", {
          from: socket.userId,
          name: socket.userName,
          avatar: socket.userAvatar,
          offer,
          callType,
        });
      }
    });

    socket.on("answer-call", ({ to, answer }) => {
      const toId = to != null ? String(to) : null;
      if (!toId) return;
      const receiverSockets = userSocketMap.get(toId);
      if (!receiverSockets) return;

      for (const sid of receiverSockets) {
        io.to(sid).emit("call-answered", { answer });
      }
    });

    socket.on("ice-candidate", ({ to, candidate }) => {
      const toId = to != null ? String(to) : null;
      if (!toId) return;
      const receiverSockets = userSocketMap.get(toId);
      if (!receiverSockets) return;

      for (const sid of receiverSockets) {
        io.to(sid).emit("ice-candidate", { candidate });
      }
    });

    socket.on("chat_opened", async ({ chatId, userId }) => {
      const result = await Message.updateMany(
        {
          chatId,
          receiverId: userId,
          seen: false,
        },
        {
          $set: {
            seen: true,
            seenAt: new Date(),
          },
        },
      );

      const messages = await Message.find({
        chatId,
        receiverId: userId,
      }).select("senderId");

      const senderIds = [
        ...new Set(messages.map((m) => m.senderId.toString())),
      ];

      for (const senderId of senderIds) {
        const senderSockets = userSocketMap.get(senderId);
        if (!senderSockets) continue;

        for (const sid of senderSockets) {
          io.to(sid).emit("chat_seen_update", {
            chatId,
            seenAt: new Date(),
          });
        }
      }
    });
    socket.on("screen_share_started", ({ chatId }) => {
      socket.to(chatId).emit("screen_share_started");
    });

    socket.on("join_chat", ({ chatId }) => {
      if (!chatId) return;
      socket.join(chatId.toString());
    });

    socket.on("game_sync", ({ chatId, gameType, data }) => {
      if (!chatId || !gameType) return;
      socket.to(chatId.toString()).emit("game_sync", { gameType, data });
    });

    socket.on(
      "game_playing",
      ({ chatId, otherUserId, gameName, userName, userAvatar }) => {
        if (!chatId || !otherUserId) return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        const payload = {
          chatId: chatId.toString(),
          userId: socket.userId,
          userName: userName ?? socket.userName,
          userAvatar: userAvatar ?? socket.userAvatar,
          gameName: gameName ?? "Truth or Dare",
        };
        for (const sid of receiverSockets) {
          io.to(sid).emit("game_playing", payload);
        }
      },
    );

    socket.on("game_left", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      const receiverSockets = userSocketMap.get(otherUserId.toString());
      if (!receiverSockets) return;
      for (const sid of receiverSockets) {
        io.to(sid).emit("game_left", {
          chatId: chatId.toString(),
          userId: socket.userId,
        });
      }
    });

    socket.on("end-call", ({ to }) => {
      const raw = to != null ? String(to).trim() : "";
      const toId = raw || null;
      const payload = { endedBy: socket.userId, to: toId };
      if (toId) {
        const receiverSockets = userSocketMap.get(toId);
        if (receiverSockets) {
          for (const sid of receiverSockets) {
            io.to(sid).emit("call-ended", payload);
          }
        }
        io.to(toId).emit("call-ended", payload);
      }
      socket.emit("call-ended", payload);
      io.emit("call-ended", payload);
    });
  });
};

// ================= HELPERS =================
export const getReceiverSocketId = (userId) => {
  const sockets = userSocketMap.get(userId?.toString());
  if (!sockets) return [];
  return Array.from(sockets);
};

/** Emit to every socket for a user (handles multiple devices). */
export const emitToUser = (userId, event, ...args) => {
  const ids = getReceiverSocketId(userId);
  for (const sid of ids) {
    io.to(sid).emit(event, ...args);
  }
};

export { io };
