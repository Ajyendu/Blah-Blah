import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  const senderId = req.user._id;
  const { conversationId, text } = req.body;

  const conversation = await Conversation.findById(conversationId);

  // 🔐 BLOCK receiver reply
  if (
    conversation.createdBy.toString() !== senderId.toString() &&
    !conversation.acceptedBy
  ) {
    return res.status(403).json({
      message: "Chat not accepted yet",
    });
  }

  const receiverId = conversation.participants.find(
    (id) => id.toString() !== senderId.toString()
  );

  const message = await Message.create({
    conversationId,
    senderId,
    receiverId,
    text,
    revealAt: revealAt ? new Date(Date.now() + revealAt) : null,
    revealed: revealAt ? false : true,
  });
  io.to(chatId.toString()).emit("new_message", message);

  conversation.lastMessage = message._id;
  await conversation.save();

  res.status(201).json(message);
};
