import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import ChatNote from "../models/chatNote.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io, emitToUser } from "../lib/socket.js";
import Conversation from "../models/conversation.model.js";
import RejectedRequest from "../models/rejectedRequest.model.js";
import { generateAIReply } from "../AI/aiService.js";

const aiUsageMap = new Map();

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const scope = req.body?.scope ?? req.query?.scope;
    const userId = req.user._id;

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    const isSender = message.senderId.toString() === userId.toString();
    const isReceiver =
      message.receiverId && message.receiverId.toString() === userId.toString();

    /* ================= DELETE FOR ME ================= */
    if (scope === "me") {
      if (!isSender && !isReceiver) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      if (!message.deletedFor) message.deletedFor = [];
      if (
        !message.deletedFor.some((id) => id.toString() === userId.toString())
      ) {
        message.deletedFor.push(userId);
      }
      await message.save();
      await ChatNote.deleteMany({ messageId: message._id, userId });
      return res.json({ success: true });
    }

    /* ================= DELETE FOR EVERYONE ================= */
    if (scope === "everyone") {
      if (!isSender) {
        return res
          .status(403)
          .json({ message: "Only the sender can delete for everyone" });
      }
      message.deleted = true;
      message.deletedBy = userId;
      message.text = "";
      message.image = "";
      await message.save();

      await ChatNote.deleteMany({ messageId: message._id });

      const payload = {
        messageId: message._id,
        deletedBy: userId,
      };

      // 🔥 SEND TO BOTH USERS (each may have multiple sockets)
      emitToUser(message.senderId.toString(), "messageDeletedForEveryone", payload);
      emitToUser(message.receiverId.toString(), "messageDeletedForEveryone", payload);

      return res.json({ success: true });
    }

    res.status(400).json({ message: "Invalid delete scope" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessageByCode = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { userCode, text } = req.body;

    if (!userCode?.trim()) {
      return res.status(400).json({ message: "User code is required" });
    }

    const receiver = await User.findOne({ userCode: userCode.trim() });
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (receiver._id.equals(senderId)) {
      return res.status(400).json({ message: "Cannot message yourself" });
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentRejection = await RejectedRequest.findOne({
      requesterId: senderId,
      rejectorId: receiver._id,
      rejectedAt: { $gte: twentyFourHoursAgo },
    });
    if (recentRejection) {
      return res.status(403).json({
        message:
          "You cannot send a request to this user for 24 hours after they rejected your previous request.",
      });
    }

    let chat = await Conversation.findOne({
      participants: { $all: [senderId, receiver._id] },
    });

    // 🆕 CREATE PENDING CHAT ON FIRST MESSAGE (or when starting chat with no text)
    if (!chat) {
      chat = await Conversation.create({
        participants: [senderId, receiver._id],
        createdBy: senderId,
        acceptedBy: null, // 🔐 pending
      });
    }

    // 🔐 BLOCK IF NOT ACCEPTED AND SENDER IS NOT CREATOR
    if (!chat.acceptedBy && chat.createdBy.toString() !== senderId.toString()) {
      return res.status(403).json({
        message: "Chat not accepted yet",
      });
    }

    let message = null;
    const textTrim = text?.trim();
    if (textTrim) {
      message = await Message.create({
        chatId: chat._id,
        senderId,
        receiverId: receiver._id,
        text: textTrim,
      });
      chat.lastMessage = message._id;
      await chat.save();
    }

    // 🔔 populate chat for frontend (for response + socket)
    const populatedChat = await Conversation.findById(chat._id)
      .populate("participants", "fullName profilePic userCode")
      .populate("lastMessage");

    const payload = {
      chat: populatedChat,
      message,
    };

    const receiverSocket = getReceiverSocketId(receiver._id.toString());
    const senderSocket = getReceiverSocketId(senderId.toString());
    if (receiverSocket.length) {
      for (const sid of receiverSocket) io.to(sid).emit("newChatMessage", payload);
    }
    if (senderSocket.length) {
      for (const sid of senderSocket) io.to(sid).emit("newChatMessage", payload);
    }

    return res.status(200).json({ chat: populatedChat });
  } catch (err) {
    console.error("sendMessageByCode error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    // mark unseen messages as seen
    const unseenMessages = await Message.find({
      chatId: conversationId,
      receiverId: userId,
      seen: false,
      $or: [
        { visibleTo: { $exists: false } }, // old messages
        { visibleTo: { $size: 0 } }, // public messages
        { visibleTo: userId }, // private visible messages
      ],
    });

    if (unseenMessages.length > 0) {
      const seenAt = new Date();

      await Message.updateMany(
        {
          chatId: conversationId,
          receiverId: userId,
          seen: false,
        },
        { $set: { seen: true, seenAt } },
      );

      unseenMessages.forEach((msg) => {
        const senderSockets = getReceiverSocketId(msg.senderId.toString());
        for (const sid of senderSockets) {
          io.to(sid).emit("messageSeen", { messageId: msg._id, seenAt });
        }
      });
    }

    const messages = await Message.find({
      chatId: conversationId,
      $or: [
        { visibleTo: { $size: 0 } }, // normal messages
        { visibleTo: userId }, // private visible
      ],
      deletedFor: { $nin: [userId] }, // exclude messages this user deleted for themselves
    });

    const normalized = messages.map((m) => normalizeMessage(m.toObject()));

    // ✅ SEND ONCE — THIS IS THE FIX
    res.status(200).json(normalized);
  } catch (err) {
    console.error("getMessagesByConversation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const {
      text,
      image,
      fileName: requestedFileName,
      conversationId,
      revealAt,
    } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Messaging allowed on both devices (sender and receiver) even when chat not yet accepted

    // ================= PRIVATE AI DETECT =================
    const isPrivateAI = text?.trim().toLowerCase().startsWith("@buddy");

    let imageUrl = "";
    let savedFileName = "";
    if (image) {
      const isImage = typeof image === "string" && /^data:image\//i.test(image);
      const uploadOptions = isImage ? {} : { resource_type: "raw" };
      const uploadResponse = await cloudinary.uploader.upload(
        image,
        uploadOptions,
      );
      imageUrl = uploadResponse.secure_url;
      savedFileName =
        requestedFileName ||
        (uploadResponse.original_filename && uploadResponse.format
          ? `${uploadResponse.original_filename}.${uploadResponse.format}`
          : uploadResponse.original_filename || "") ||
        "";
    }

    const isTimed = !!revealAt;
    const BOT_ID = "6997e34d5bfffd55ff54458d";

    // ================= USER MESSAGE =================
    const newMessage = await Message.create({
      chatId: conversation._id,
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
      fileName: savedFileName,
      revealAt: isTimed ? new Date(revealAt) : null,
      revealed: !isTimed,
      isPrivateAI,
      visibleTo: isPrivateAI ? [senderId] : [],
    });

    const payload = normalizeMessage(newMessage.toObject());

    // ================= SOCKET EMIT =================
    if (!isPrivateAI) {
      emitToUser(senderId.toString(), "new_message", payload);
      emitToUser(receiverId.toString(), "new_message", payload);
    }

    if (isPrivateAI) {
      const senderSockets = getReceiverSocketId(senderId.toString());

      // 🔥 send user message only to sender
      for (const sid of senderSockets) {
        io.to(sid).emit("new_message", payload);
        io.to(sid).emit("bot_typing", true);
      }

      const cleanPrompt = text.replace(/@buddy/i, "").trim();

      // ================= RATE LIMIT =================
      const lastUsed = aiUsageMap.get(senderId.toString()) || 0;
      if (Date.now() - lastUsed < 3000) {
        for (const sid of senderSockets) {
          io.to(sid).emit("bot_typing", false);
        }
        return res.status(429).json({
          message: "Buddy: slow down a bit 🙂",
        });
      }
      aiUsageMap.set(senderId.toString(), Date.now());

      // ================= CONTEXT MEMORY =================
      const contextMessages = await Message.find({
        chatId: conversation._id,
        $or: [{ visibleTo: { $size: 0 } }, { visibleTo: senderId }],
      })
        .sort({ createdAt: -1 })
        .limit(6)
        .lean();

      const contextText = contextMessages
        .reverse()
        .map((m) => {
          const role =
            m.senderId.toString() === senderId.toString() ? "User" : "buddy";
          return `${role}: ${m.text}`;
        })
        .join("\n");

      // ================= LOCAL COMMANDS (FREE) =================
      let aiReply = null;

      if (cleanPrompt === "time") {
        aiReply = `🕒 ${new Date().toLocaleTimeString()}`;
      }

      if (cleanPrompt === "date") {
        aiReply = `📅 ${new Date().toDateString()}`;
      }

      if (cleanPrompt.startsWith("calc")) {
        try {
          const expr = cleanPrompt.replace("calc", "");
          aiReply = `🧮 ${eval(expr)}`;
        } catch {
          aiReply = "Invalid calculation 😅";
        }
      }

      // ================= COMMAND SYSTEM =================
      if (!aiReply && cleanPrompt === "summarize") {
        aiReply =
          "Summary:\n" +
          contextMessages
            .map((m) => m.text)
            .join(" ")
            .slice(0, 250);
      }

      // ================= GEMINI CALL =================
      if (!aiReply) {
        const fullPrompt = `
    Recent conversation:
    ${contextText}
    
    User: ${cleanPrompt}
    `;

        aiReply = await generateAIReply(fullPrompt);
      }

      // ================= HUMAN FEEL =================
      await new Promise((r) => setTimeout(r, 600));

      // ================= TRIM LONG REPLIES =================
      if (aiReply.length > 300) {
        aiReply = aiReply.slice(0, 300) + "...";
      }

      if (senderSockets.length) {
        for (const sid of senderSockets) {
          io.to(sid).emit("bot_typing", false);
        }
      }

      // ================= BOT MESSAGE =================
      const botMessage = await Message.create({
        chatId: conversation._id,
        senderId: BOT_ID,
        receiverId: senderId,
        text: aiReply,
        isPrivateAI: true,
        visibleTo: [senderId],
        revealed: true,
      });

      const botPayload = normalizeMessage(botMessage.toObject());

      for (const sid of senderSockets) {
        io.to(sid).emit("new_message", botPayload);
      }
    }

    res.status(201).json(payload);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function normalizeMessage(message) {
  if (
    message.revealAt &&
    !message.revealed &&
    new Date() >= message.revealAt &&
    !message.deleted
  ) {
    message.revealed = true;
  }
  return message;
}
