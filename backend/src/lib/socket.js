import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { detectBotMention } from "./detectBot.js";
import { generateAIReply } from "../AI/aiService.js";
import ChatMemory from "../models/chatMemory.model.js";
import { extractMemory } from "../AI/memoryExtractor.js";
import { corsOriginCallback } from "./corsConfig.js";

let io;

/**
 * userId -> Set(socketId)
 */
const userSocketMap = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    path: "/socket.io",
    maxHttpBufferSize: 5e6, // 5MB for drawing canvas state
    cors: {
      origin: corsOriginCallback,
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Cookie",
      ],
    },
  });

  // ================= AUTH =================
  io.use(async (socket, next) => {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret || !secret.trim()) {
        console.error("❌ socket auth: JWT_SECRET is not set in .env");
        return next(new Error("Unauthorized"));
      }

      const token = socket.handshake.auth?.token;
      if (!token) {
        console.error("❌ socket auth: token missing");
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, secret);
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

    socket.on(
      "drawing_playing",
      ({ chatId, otherUserId }) => {
        if (!chatId || !otherUserId) return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        const payload = {
          chatId: chatId.toString(),
          userId: socket.userId,
        };
        for (const sid of receiverSockets) {
          io.to(sid).emit("drawing_playing", payload);
        }
      },
    );

    socket.on("drawing_left", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      const receiverSockets = userSocketMap.get(otherUserId.toString());
      if (!receiverSockets) return;
      for (const sid of receiverSockets) {
        io.to(sid).emit("drawing_left", {
          chatId: chatId.toString(),
          userId: socket.userId,
        });
      }
    });

    socket.on(
      "drawing_stroke",
      ({ chatId, otherUserId, points, color, brushSize, tool }) => {
        if (!chatId || !otherUserId || !Array.isArray(points) || points.length < 2)
          return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        const payload = {
          chatId: chatId.toString(),
          points,
          color: color ?? "#1e293b",
          brushSize: brushSize ?? 4,
          tool: tool ?? "brush",
        };
        for (const sid of receiverSockets) {
          io.to(sid).emit("drawing_stroke", payload);
        }
      },
    );

    socket.on("drawing_undo", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      const receiverSockets = userSocketMap.get(otherUserId.toString());
      if (!receiverSockets) return;
      const payload = { chatId: chatId.toString(), fromUserId: socket.userId };
      for (const sid of receiverSockets) {
        io.to(sid).emit("drawing_undo", payload);
      }
    });

    socket.on("drawing_redo", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      const receiverSockets = userSocketMap.get(otherUserId.toString());
      if (!receiverSockets) return;
      const payload = { chatId: chatId.toString(), fromUserId: socket.userId };
      for (const sid of receiverSockets) {
        io.to(sid).emit("drawing_redo", payload);
      }
    });

    socket.on("drawing_clear", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      const receiverSockets = userSocketMap.get(otherUserId.toString());
      if (!receiverSockets) return;
      const payload = { chatId: chatId.toString(), fromUserId: socket.userId };
      for (const sid of receiverSockets) {
        io.to(sid).emit("drawing_clear", payload);
      }
    });

    socket.on("drawing_request_canvas_state", ({ chatId, requestToUserId }) => {
      if (!chatId || !requestToUserId) return;
      const targetSockets = userSocketMap.get(String(requestToUserId));
      if (!targetSockets) return;
      for (const sid of targetSockets) {
        io.to(sid).emit("drawing_request_canvas_state", { chatId: chatId.toString() });
      }
    });

    socket.on("drawing_canvas_state", ({ chatId, imageData }) => {
      if (!chatId || typeof imageData !== "string") return;
      const room = String(chatId);
      socket.to(room).emit("drawing_canvas_state", { chatId: room, imageData });
    });

    socket.on(
      "watch_party_playing",
      ({ chatId, otherUserId }) => {
        if (!chatId || !otherUserId) return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        const payload = {
          chatId: chatId.toString(),
          userId: socket.userId,
        };
        for (const sid of receiverSockets) {
          io.to(sid).emit("watch_party_playing", payload);
        }
      },
    );

    socket.on("watch_party_left", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      const receiverSockets = userSocketMap.get(otherUserId.toString());
      if (!receiverSockets) return;
      for (const sid of receiverSockets) {
        io.to(sid).emit("watch_party_left", {
          chatId: chatId.toString(),
          userId: socket.userId,
        });
      }
    });

    socket.on(
      "watch_party_youtube_url",
      ({ chatId, otherUserId, url }) => {
        if (!chatId || !otherUserId) return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        const payload = {
          chatId: chatId.toString(),
          userId: socket.userId,
          url: url ?? "",
        };
        for (const sid of receiverSockets) {
          io.to(sid).emit("watch_party_youtube_url", payload);
        }
      },
    );

    socket.on(
      "watch_party_local_video_url",
      ({ chatId, otherUserId, url }) => {
        if (!chatId || !otherUserId || !url) return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        const payload = {
          chatId: chatId.toString(),
          userId: socket.userId,
          url: String(url),
        };
        for (const sid of receiverSockets) {
          io.to(sid).emit("watch_party_local_video_url", payload);
        }
      },
    );

    socket.on(
      "watch_party_sync",
      ({ chatId, otherUserId, event, currentTime, isPaused, ts, source: senderSource }) => {
        if (!chatId || !otherUserId) return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        const payload = {
          chatId: chatId.toString(),
          userId: socket.userId,
          event: event ?? "timeupdate",
          currentTime: typeof currentTime === "number" ? currentTime : undefined,
          isPaused: !!isPaused,
          ts: typeof ts === "number" ? ts : undefined,
          source: senderSource === "local" || senderSource === "youtube" ? senderSource : null,
        };
        for (const sid of receiverSockets) {
          io.to(sid).emit("watch_party_sync", payload);
        }
      },
    );

    socket.on("watch_party_clear", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      const receiverSockets = userSocketMap.get(otherUserId.toString());
      if (!receiverSockets) return;
      const payload = {
        chatId: chatId.toString(),
        userId: socket.userId,
      };
      for (const sid of receiverSockets) {
        io.to(sid).emit("watch_party_clear", payload);
      }
    });

    socket.on(
      "watch_party_webrtc_signal",
      ({ chatId, otherUserId, type, payload: signalPayload }) => {
        if (!chatId || !otherUserId || !type) return;
        const receiverSockets = userSocketMap.get(otherUserId.toString());
        if (!receiverSockets) return;
        for (const sid of receiverSockets) {
          io.to(sid).emit("watch_party_webrtc_signal", {
            chatId: chatId.toString(),
            userId: socket.userId,
            type,
            payload: signalPayload,
          });
        }
      },
    );

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

/** Live Socket.IO connections (all tabs / devices). For /metrics. */
export const getConnectedSocketCount = () =>
  typeof io?.engine?.clientsCount === "number" ? io.engine.clientsCount : 0;

export { io };
