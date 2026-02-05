import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

let io;

/**
 * userId -> Set(socketId)
 */
const userSocketMap = new Map();

export const initSocket = (server) => {
  io = new Server(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
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
        "_id fullName profilePic"
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

    // ================= CALL =================
    socket.on("call-user", ({ to, offer, callType }) => {
      const receiverSockets = userSocketMap.get(to);
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
      const receiverSockets = userSocketMap.get(to);
      if (!receiverSockets) return;

      for (const sid of receiverSockets) {
        io.to(sid).emit("call-answered", { answer });
      }
    });

    socket.on("ice-candidate", ({ to, candidate }) => {
      const receiverSockets = userSocketMap.get(to);
      if (!receiverSockets) return;

      for (const sid of receiverSockets) {
        io.to(sid).emit("ice-candidate", { candidate });
      }
    });

    // socket.on("mark_messages_seen", async ({ conversationId }) => {
    //   try {
    //     if (!conversationId) return;

    //     const viewerId = socket.userId;
    //     const now = new Date();

    //     // find unseen messages sent by OTHER users
    //     const unseenMessages = await Message.find({
    //       conversationId,
    //       senderId: { $ne: viewerId },
    //       seenAt: { $exists: false },
    //     }).select("senderId");

    //     if (unseenMessages.length === 0) return;

    //     // mark seen
    //     await Message.updateMany(
    //       {
    //         conversationId,
    //         senderId: { $ne: viewerId },
    //         seenAt: { $exists: false },
    //       },
    //       { $set: { seenAt: now } }
    //     );

    //     // notify each sender directly
    //     const uniqueSenders = [
    //       ...new Set(unseenMessages.map((m) => m.senderId.toString())),
    //     ];

    //     for (const senderId of uniqueSenders) {
    //       const senderSockets = userSocketMap.get(senderId);
    //       if (!senderSockets) continue;

    //       for (const sid of senderSockets) {
    //         io.to(sid).emit("messagesSeen", {
    //           conversationId,
    //           seenAt: now,
    //         });
    //       }
    //     }
    //   } catch (err) {
    //     console.error("❌ mark_messages_seen failed:", err);
    //   }
    // });
    socket.on("chat_opened", async ({ chatId, userId }) => {
      // Mark all messages sent TO this user as seen
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
        }
      );

      // Notify sender(s)
      // socket.to(chatId.toString()).emit("chat_seen_update", {
      //   chatId,
      //   seenAt: new Date(),
      // });
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
    socket.on("join_chat", ({ chatId }) => {
      if (!chatId) return;
      socket.join(chatId.toString());
    });

    // socket.on("joinChat", ({ conversationId }) => {
    //   if (!conversationId) return;

    //   socket.join(conversationId);
    //   console.log(`📥 socket ${socket.id} joined chat ${conversationId}`);
    // });

    socket.on("end-call", ({ to }) => {
      const receiverSockets = userSocketMap.get(to);
      if (receiverSockets) {
        for (const sid of receiverSockets) {
          io.to(sid).emit("call-ended");
        }
      }

      socket.emit("call-ended");
    });
  });
};

// ================= HELPERS =================
export const getReceiverSocketId = (userId) => {
  const sockets = userSocketMap.get(userId?.toString());
  if (!sockets) return [];
  return Array.from(sockets);
};

export { io };
