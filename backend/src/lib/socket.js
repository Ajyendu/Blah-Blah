import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { createAdapter } from "@socket.io/redis-adapter";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { corsOriginCallback } from "./corsConfig.js";
import {
  getRedis,
  isRedisReady,
  redisGetJson,
  redisSetJson,
} from "./redis.js";
import { cacheKey, TTL } from "./cache.js";

let io;

/**
 * userId -> Set(socketId) — local fallback when Redis is off
 */
const userSocketMap = new Map();
const ONLINE_KEY = "presence:online";
const socketsKey = (userId) => `presence:sockets:${userId}`;

let onlineBroadcastTimer = null;

async function listOnlineUserIds() {
  if (isRedisReady()) {
    return getRedis().smembers(ONLINE_KEY);
  }
  return Array.from(userSocketMap.keys());
}

function broadcastOnlineUsers() {
  if (!io) return;
  clearTimeout(onlineBroadcastTimer);
  onlineBroadcastTimer = setTimeout(async () => {
    try {
      const ids = await listOnlineUserIds();
      io.emit("getOnlineUsers", ids);
    } catch (err) {
      console.error("presence broadcast:", err.message);
    }
  }, 250);
}

async function addPresence(userId, socketId) {
  const sockets = userSocketMap.get(userId) || new Set();
  sockets.add(socketId);
  userSocketMap.set(userId, sockets);
  if (!isRedisReady()) return;
  const redis = getRedis();
  await redis.sadd(socketsKey(userId), socketId);
  await redis.sadd(ONLINE_KEY, userId);
  await redis.expire(socketsKey(userId), 60 * 60 * 24);
}

async function removePresence(userId, socketId) {
  const set = userSocketMap.get(userId);
  if (set) {
    set.delete(socketId);
    if (set.size === 0) userSocketMap.delete(userId);
  }
  if (!isRedisReady()) return;
  const redis = getRedis();
  await redis.srem(socketsKey(userId), socketId);
  const remaining = await redis.scard(socketsKey(userId));
  if (remaining === 0) await redis.srem(ONLINE_KEY, userId);
}

function emitToMappedUser(userId, event, payload) {
  if (!io || userId == null) return;
  io.to(String(userId)).emit(event, payload);
}

export const initSocket = async (server) => {
  io = new Server(server, {
    path: "/socket.io",
    maxHttpBufferSize: 5e6,
    pingInterval: 25000,
    pingTimeout: 20000,
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

  const redis = getRedis();
  if (redis) {
    const pub = redis.duplicate();
    const sub = redis.duplicate();
    io.adapter(createAdapter(pub, sub));
    console.log("Socket.IO Redis adapter enabled");
  }

  io.use(async (socket, next) => {
    try {
      const secret = process.env.JWT_SECRET;
      if (!secret || !secret.trim()) {
        return next(new Error("Unauthorized"));
      }

      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const decoded = jwt.verify(token, secret);
      const cacheKeyUser = cacheKey.userPub(decoded.userId);
      let user = await redisGetJson(cacheKeyUser);
      if (!user) {
        user = await User.findById(decoded.userId)
          .select("_id fullName profilePic")
          .lean();
        if (user) {
          await redisSetJson(
            cacheKeyUser,
            {
              _id: user._id,
              fullName: user.fullName,
              profilePic: user.profilePic,
            },
            TTL.user,
          );
        }
      }

      if (!user) {
        return next(new Error("Unauthorized"));
      }

      socket.userId = user._id.toString();
      socket.userName = user.fullName;
      socket.userAvatar = user.profilePic;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    await addPresence(socket.userId, socket.id);
    socket.join(socket.userId);
    broadcastOnlineUsers();

    socket.on("disconnect", async () => {
      await removePresence(socket.userId, socket.id);
      broadcastOnlineUsers();
    });

    socket.on("call-user", ({ to, offer, callType }) => {
      const toId = to != null ? String(to) : null;
      if (!toId) return;
      emitToMappedUser(toId, "incoming-call", {
        from: socket.userId,
        name: socket.userName,
        avatar: socket.userAvatar,
        offer,
        callType,
      });
    });

    socket.on("answer-call", ({ to, answer }) => {
      const toId = to != null ? String(to) : null;
      if (!toId) return;
      emitToMappedUser(toId, "call-answered", { answer });
    });

    socket.on("ice-candidate", ({ to, candidate }) => {
      const toId = to != null ? String(to) : null;
      if (!toId) return;
      emitToMappedUser(toId, "ice-candidate", { candidate });
    });

    socket.on("chat_opened", async ({ chatId, userId }) => {
      if (!chatId || !userId) return;
      try {
        await Message.updateMany(
          { chatId, receiverId: userId, seen: false },
          { $set: { seen: true, seenAt: new Date() } },
        );

        const senderIds = await Message.distinct("senderId", {
          chatId,
          receiverId: userId,
        });

        const seenAt = new Date();
        for (const senderId of senderIds) {
          emitToMappedUser(senderId.toString(), "chat_seen_update", {
            chatId,
            seenAt,
          });
        }
      } catch (err) {
        console.error("chat_opened error:", err.message);
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
        emitToMappedUser(otherUserId, "game_playing", {
          chatId: chatId.toString(),
          userId: socket.userId,
          userName: userName ?? socket.userName,
          userAvatar: userAvatar ?? socket.userAvatar,
          gameName: gameName ?? "Truth or Dare",
        });
      },
    );

    socket.on("game_left", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "game_left", {
        chatId: chatId.toString(),
        userId: socket.userId,
      });
    });

    socket.on("drawing_playing", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "drawing_playing", {
        chatId: chatId.toString(),
        userId: socket.userId,
      });
    });

    socket.on("drawing_left", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "drawing_left", {
        chatId: chatId.toString(),
        userId: socket.userId,
      });
    });

    socket.on(
      "drawing_stroke",
      ({ chatId, otherUserId, points, color, brushSize, tool }) => {
        if (!chatId || !otherUserId || !Array.isArray(points) || points.length < 2)
          return;
        emitToMappedUser(otherUserId, "drawing_stroke", {
          chatId: chatId.toString(),
          points,
          color: color ?? "#1e293b",
          brushSize: brushSize ?? 4,
          tool: tool ?? "brush",
        });
      },
    );

    socket.on("drawing_undo", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "drawing_undo", {
        chatId: chatId.toString(),
        fromUserId: socket.userId,
      });
    });

    socket.on("drawing_redo", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "drawing_redo", {
        chatId: chatId.toString(),
        fromUserId: socket.userId,
      });
    });

    socket.on("drawing_clear", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "drawing_clear", {
        chatId: chatId.toString(),
        fromUserId: socket.userId,
      });
    });

    socket.on("drawing_request_canvas_state", ({ chatId, requestToUserId }) => {
      if (!chatId || !requestToUserId) return;
      emitToMappedUser(requestToUserId, "drawing_request_canvas_state", {
        chatId: chatId.toString(),
      });
    });

    socket.on("drawing_canvas_state", ({ chatId, imageData }) => {
      if (!chatId || typeof imageData !== "string") return;
      const room = String(chatId);
      socket.to(room).emit("drawing_canvas_state", { chatId: room, imageData });
    });

    socket.on("watch_party_playing", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "watch_party_playing", {
        chatId: chatId.toString(),
        userId: socket.userId,
      });
    });

    socket.on("watch_party_left", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "watch_party_left", {
        chatId: chatId.toString(),
        userId: socket.userId,
      });
    });

    socket.on("watch_party_youtube_url", ({ chatId, otherUserId, url }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "watch_party_youtube_url", {
        chatId: chatId.toString(),
        userId: socket.userId,
        url: url ?? "",
      });
    });

    socket.on("watch_party_local_video_url", ({ chatId, otherUserId, url }) => {
      if (!chatId || !otherUserId || !url) return;
      emitToMappedUser(otherUserId, "watch_party_local_video_url", {
        chatId: chatId.toString(),
        userId: socket.userId,
        url: String(url),
      });
    });

    socket.on(
      "watch_party_sync",
      ({
        chatId,
        otherUserId,
        event,
        currentTime,
        isPaused,
        ts,
        source: senderSource,
      }) => {
        if (!chatId || !otherUserId) return;
        emitToMappedUser(otherUserId, "watch_party_sync", {
          chatId: chatId.toString(),
          userId: socket.userId,
          event: event ?? "timeupdate",
          currentTime: typeof currentTime === "number" ? currentTime : undefined,
          isPaused: !!isPaused,
          ts: typeof ts === "number" ? ts : undefined,
          source:
            senderSource === "local" || senderSource === "youtube"
              ? senderSource
              : null,
        });
      },
    );

    socket.on("watch_party_clear", ({ chatId, otherUserId }) => {
      if (!chatId || !otherUserId) return;
      emitToMappedUser(otherUserId, "watch_party_clear", {
        chatId: chatId.toString(),
        userId: socket.userId,
      });
    });

    socket.on(
      "watch_party_webrtc_signal",
      ({ chatId, otherUserId, type, payload: signalPayload }) => {
        if (!chatId || !otherUserId || !type) return;
        emitToMappedUser(otherUserId, "watch_party_webrtc_signal", {
          chatId: chatId.toString(),
          userId: socket.userId,
          type,
          payload: signalPayload,
        });
      },
    );

    socket.on("end-call", ({ to }) => {
      const raw = to != null ? String(to).trim() : "";
      const toId = raw || null;
      const payload = { endedBy: socket.userId, to: toId };
      if (toId) emitToMappedUser(toId, "call-ended", payload);
      socket.emit("call-ended", payload);
    });
  });
};

export const getReceiverSocketId = (userId) => {
  const sockets = userSocketMap.get(userId?.toString());
  if (!sockets) return [];
  return Array.from(sockets);
};

export const emitToUser = (userId, event, ...args) => {
  if (!io || userId == null) return;
  io.to(String(userId)).emit(event, ...args);
};

export const getConnectedSocketCount = () =>
  typeof io?.engine?.clientsCount === "number" ? io.engine.clientsCount : 0;

export { io };
