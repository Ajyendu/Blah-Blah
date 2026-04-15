import Conversation from "../models/conversation.model.js";
import { emitToUser } from "../lib/socket.js";
import Message from "../models/message.model.js";
import RejectedRequest from "../models/rejectedRequest.model.js";
import mongoose from "mongoose";
import { decrypt } from "../lib/encryption.js";

export const acceptChat = async (req, res) => {
  const userId = req.user._id;
  const { conversationId } = req.body;

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return res.status(404).json({ message: "Chat not found" });
  }

  // 🔥 If already accepted, just return success
  if (conversation.acceptedBy) {
    return res.status(200).json({ success: true });
  }

  // 🔥 If creator hits accept, do NOTHING but still succeed
  if (conversation.createdBy.toString() === userId.toString()) {
    return res.status(200).json({ success: true });
  }

  conversation.acceptedBy = userId;
  await conversation.save();

  // Notify creator so their chat list (and Friends panel) updates — both see each other
  emitToUser(conversation.createdBy.toString(), "chatAccepted", {
    conversationId,
  });

  return res.status(200).json({ success: true });
};

export const rejectChat = async (req, res) => {
  const userId = req.user._id;
  const { conversationId } = req.body;

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return res.status(404).json({ message: "Chat not found" });
  }

  // ❌ creator cannot reject their own chat
  if (conversation.createdBy.toString() === userId.toString()) {
    return res.status(403).json({ message: "Cannot reject your own chat" });
  }

  // 🔔 STEP 2 — SOCKET NOTIFY SENDER
  emitToUser(conversation.createdBy.toString(), "chatRejected", {
    conversationId,
  });

  // 📌 Record rejection so sender cannot send a new request to this user for 24 hrs
  await RejectedRequest.create({
    requesterId: conversation.createdBy,
    rejectorId: userId,
    rejectedAt: new Date(),
  });

  // 🧹 clean messages
  await Message.deleteMany({ chatId: conversationId });

  // 🧹 delete conversation
  await Conversation.findByIdAndDelete(conversationId);

  res.json({ success: true });
};

/** Remove friend: set acceptedBy to null so the other user sees accept/reject again; both drop from friends list. */
export const removeFriend = async (req, res) => {
  const userId = req.user._id;
  const rawId = req.body?.conversationId ?? req.query?.conversationId;
  const conversationId =
    rawId != null
      ? (typeof rawId === "object" && rawId.toString
          ? rawId.toString()
          : String(rawId))
      : null;

  if (!conversationId) {
    return res.status(400).json({ message: "conversationId is required" });
  }

  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    // Idempotent: already deleted or invalid id — return success so frontend can refresh list
    return res.status(200).json({ success: true });
  }

  const userIdStr = userId.toString();
  const isParticipant = conversation.participants.some(
    (p) => (p && p.toString()) === userIdStr,
  );
  if (!isParticipant) {
    return res.status(403).json({ message: "Not a participant" });
  }

  if (!conversation.acceptedBy) {
    return res.status(400).json({ message: "Chat is not accepted" });
  }

  const otherUserId = conversation.participants.find(
    (p) => p && p.toString() !== userIdStr,
  );

  conversation.acceptedBy = null;
  // Remover = gets request (Accept/Reject). Removed = sent request (Request sent).
  // So createdBy = the one who was removed (they "sent" the new request in UI terms).
  if (otherUserId) conversation.createdBy = otherUserId;
  await conversation.save();

  if (otherUserId) {
    emitToUser(otherUserId.toString(), "chatUnaccepted", { conversationId });
  }

  return res.status(200).json({ success: true });
};

export const getMyChats = async (req, res) => {
  const userId = req.user._id;
  const userOid =
    userId instanceof mongoose.Types.ObjectId
      ? userId
      : new mongoose.Types.ObjectId(userId);

  const chats = await Conversation.find({
    participants: userId,
  })
    .populate("participants", "fullName profilePic userCode")
    .sort({ updatedAt: -1 })
    .limit(50)
    .lean();

  if (!chats.length) {
    return res.json([]);
  }

  const chatIds = chats.map((c) => c._id);
  const visibilityMatch = {
    chatId: { $in: chatIds },
    $or: [
      { visibleTo: { $size: 0 } },
      { visibleTo: userOid },
    ],
    deletedFor: { $nin: [userOid] },
  };

  // One aggregation replaces per-chat findOne + countDocuments (was up to 100 queries).
  const lastByChat = await Message.aggregate([
    { $match: visibilityMatch },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$chatId",
        doc: { $first: "$$ROOT" },
      },
    },
  ]);

  const lastMap = new Map(
    lastByChat.map((row) => [String(row._id), row.doc]),
  );

  const visibleChats = [];

  for (const doc of chats) {
    const cid = String(doc._id);
    const lastRaw = lastMap.get(cid);
    if (!lastRaw) continue;

    let lastMessage = { ...lastRaw };
    if (lastMessage && Array.isArray(lastMessage.deletedFor)) {
      const deletedForMe = lastMessage.deletedFor.some(
        (id) => id && String(id) === String(userId),
      );
      if (deletedForMe) lastMessage = null;
    }
    if (lastMessage) {
      lastMessage = {
        ...lastMessage,
        text:
          lastMessage.text != null ? decrypt(lastMessage.text) : lastMessage.text,
        fileName:
          lastMessage.fileName != null && lastMessage.fileName !== ""
            ? decrypt(lastMessage.fileName)
            : lastMessage.fileName,
      };
    }

    visibleChats.push({
      ...doc,
      lastMessage,
    });
  }

  res.json(visibleChats);
};

/** All accepted conversations (friends) — no message-count filter. Used for Friends panel only. */
export const getMyFriends = async (req, res) => {
  const userId = req.user._id;

  const chats = await Conversation.find({
    participants: userId,
    acceptedBy: { $ne: null },
  })
    .populate("participants", "fullName profilePic userCode")
    .sort({ updatedAt: -1 })
    .limit(200)
    .lean();

  res.json(chats);
};
