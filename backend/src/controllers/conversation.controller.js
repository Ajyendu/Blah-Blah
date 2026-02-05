import Conversation from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";

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
  const senderSocket = getReceiverSocketId(conversation.createdBy.toString());

  if (senderSocket) {
    io.to(senderSocket).emit("chatRejected", {
      conversationId,
    });
  }

  // 🧹 clean messages
  await Message.deleteMany({ chatId: conversationId });

  // 🧹 delete conversation
  await Conversation.findByIdAndDelete(conversationId);

  res.json({ success: true });
};

export const getMyChats = async (req, res) => {
  const userId = req.user._id;

  const chats = await Conversation.find({
    participants: userId,
  })
    .populate("participants", "fullName profilePic userCode")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });

  res.json(chats);
};
