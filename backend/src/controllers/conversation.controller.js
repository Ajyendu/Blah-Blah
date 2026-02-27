import Conversation from "../models/conversation.model.js";
import { emitToUser } from "../lib/socket.js";
import Message from "../models/message.model.js";
import RejectedRequest from "../models/rejectedRequest.model.js";
import mongoose from "mongoose";

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

  const chats = await Conversation.find({
    participants: userId,
  })
    .populate("participants", "fullName profilePic userCode")
    .sort({ updatedAt: -1 })
    .lean();

  const normalized = await Promise.all(
    chats.map(async (doc) => {
      const lastVisible = await Message.findOne({
        chatId: doc._id,
        $or: [
          { visibleTo: { $size: 0 } },
          { visibleTo: userId },
        ],
        deletedFor: { $nin: [userId] },
      })
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();
      let lastMessage = lastVisible || null;
      if (lastMessage && Array.isArray(lastMessage.deletedFor)) {
        const deletedForMe = lastMessage.deletedFor.some(
          (id) => id && String(id) === String(userId),
        );
        if (deletedForMe) lastMessage = null;
      }
      return {
        ...doc,
        lastMessage,
      };
    }),
  );

  // Don't show conversations with no messages visible to me (same visibility as getMessagesByConversation)
  const visibleChats = await Promise.all(
    normalized.map(async (doc) => {
      const cid = doc._id;
      const visibleToMe = await Message.countDocuments({
        chatId: new mongoose.Types.ObjectId(cid),
        $or: [
          { visibleTo: { $size: 0 } },
          { visibleTo: userId },
        ],
        deletedFor: { $nin: [new mongoose.Types.ObjectId(userId)] },
      });
      if (visibleToMe === 0) return null;
      return doc;
    }),
  );

  res.json(visibleChats.filter(Boolean));
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
    .lean();

  res.json(chats);
};
