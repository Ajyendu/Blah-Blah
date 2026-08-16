import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import ChatNote from "../models/chatNote.model.js";
import cloudinary from "../lib/cloudinary.js";
import { emitToUser } from "../lib/socket.js";
import Conversation from "../models/conversation.model.js";
import RejectedRequest from "../models/rejectedRequest.model.js";
import { encrypt, decrypt } from "../lib/encryption.js";
import {
  TTL,
  bustChat,
  bustMessages,
  cacheGet,
  cacheKey,
  cacheSet,
} from "../lib/cache.js";

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
      await bustMessages(message.chatId, message.senderId, message.receiverId);
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
      emitToUser(
        message.senderId.toString(),
        "messageDeletedForEveryone",
        payload,
      );
      emitToUser(
        message.receiverId.toString(),
        "messageDeletedForEveryone",
        payload,
      );

      await bustChat(message.chatId, message.senderId, message.receiverId);
      return res.json({ success: true });
    }

    res.status(400).json({ message: "Invalid delete scope" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};

export const sendMessageByCode = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { userCode, text } = req.body;

    if (!userCode?.trim()) {
      return res.status(400).json({ message: "User code is required" });
    }

    const code = userCode.trim();
    const codeKey = cacheKey.userCode(code);
    let receiver = await cacheGet(codeKey);
    if (!receiver) {
      receiver = await User.findOne({ userCode: code })
        .select("_id fullName profilePic userCode")
        .lean();
      if (receiver) await cacheSet(codeKey, receiver, TTL.userCode);
    }
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (String(receiver._id) === String(senderId)) {
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
        text: encrypt(textTrim),
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

    emitToUser(receiver._id.toString(), "newChatMessage", payload);
    emitToUser(senderId.toString(), "newChatMessage", payload);

    await bustChat(chat._id, senderId, receiver._id);

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
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 50);
    const beforeId = req.query.before || null;
    const pageKey = cacheKey.messages(conversationId, userId);

    if (!beforeId) {
      const cached = await cacheGet(pageKey);
      if (cached) return res.status(200).json(cached);
    }

    if (!beforeId) {
      const seenAt = new Date();
      const updated = await Message.updateMany(
        {
          chatId: conversationId,
          receiverId: userId,
          seen: false,
        },
        { $set: { seen: true, seenAt } },
      );

      if (updated.modifiedCount > 0) {
        const senderIds = await Message.distinct("senderId", {
          chatId: conversationId,
          receiverId: userId,
        });
        for (const senderId of senderIds) {
          emitToUser(senderId.toString(), "chat_seen_update", {
            chatId: conversationId,
            seenAt,
          });
        }
      }
    }

    const baseQuery = {
      chatId: conversationId,
      $or: [
        { visibleTo: { $size: 0 } }, // normal messages
        { visibleTo: userId }, // private visible
      ],
      deletedFor: { $nin: [userId] },
    };

    const findFilter = { ...baseQuery };
    if (beforeId) {
      const beforeMsg = await Message.findOne({
        _id: beforeId,
        chatId: conversationId,
      }).lean();
      if (beforeMsg) {
        findFilter.createdAt = { $lt: new Date(beforeMsg.createdAt) };
      }
    }

    const messages = await Message.find(findFilter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const normalized = messages
      .map((m) => normalizeMessage({ ...m }))
      .reverse();

    const hasMore = messages.length === limit;
    const body = { messages: normalized, hasMore };
    if (!beforeId) await cacheSet(pageKey, body, TTL.messages);
    res.status(200).json(body);
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
      clientId,
    } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findById(conversationId)
      .select("_id")
      .lean();
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    let imageUrl = "";
    let savedFileName = "";
    if (image) {
      const isImage = typeof image === "string" && /^data:image\//i.test(image);
      const uploadResponse = await cloudinary.uploader.upload(image, {
        resource_type: isImage ? "image" : "raw",
      });
      imageUrl = uploadResponse.secure_url;
      savedFileName =
        requestedFileName ||
        (uploadResponse.original_filename && uploadResponse.format
          ? `${uploadResponse.original_filename}.${uploadResponse.format}`
          : uploadResponse.original_filename || "") ||
        "";
    }

    const isTimed = !!revealAt;

    const newMessage = await Message.create({
      chatId: conversation._id,
      senderId,
      receiverId,
      text: encrypt(text || ""),
      image: imageUrl,
      fileName: encrypt(savedFileName) || "",
      revealAt: isTimed ? new Date(revealAt) : null,
      revealed: !isTimed,
    });

    Conversation.updateOne(
      { _id: conversation._id },
      { $set: { lastMessage: newMessage._id } },
    ).catch(() => {});

    const payload = normalizeMessage(newMessage.toObject());
    if (clientId) payload.clientId = String(clientId);

    emitToUser(senderId.toString(), "new_message", payload);
    emitToUser(String(receiverId), "new_message", payload);

    await bustChat(conversation._id, senderId, receiverId);

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
  if (message.text != null) message.text = decrypt(message.text);
  if (message.fileName != null && message.fileName !== "")
    message.fileName = decrypt(message.fileName);
  return message;
}
