import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Conversation from "../models/conversation.model.js";

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
    const { scope } = req.body;
    const userId = req.user._id;

    const message = await Message.findById(id);
    if (!message) return res.status(404).json({ message: "Message not found" });

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    /* ================= DELETE FOR ME ================= */
    if (scope === "me") {
      if (!message.deletedFor.includes(userId)) {
        message.deletedFor.push(userId);
      }
      await message.save();
      return res.json({ success: true });
    }

    /* ================= DELETE FOR EVERYONE ================= */
    if (scope === "everyone") {
      message.deleted = true;
      message.deletedBy = userId;
      message.text = "";
      message.image = "";
      await message.save();

      const senderSocket = getReceiverSocketId(message.senderId.toString());
      const receiverSocket = getReceiverSocketId(message.receiverId.toString());

      const payload = {
        messageId: message._id,
        deletedBy: userId,
      };

      // 🔥 SEND TO BOTH USERS
      if (senderSocket)
        io.to(senderSocket).emit("messageDeletedForEveryone", payload);
      if (receiverSocket)
        io.to(receiverSocket).emit("messageDeletedForEveryone", payload);

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

    if (!userCode || !text?.trim()) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const receiver = await User.findOne({ userCode });
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (receiver._id.equals(senderId)) {
      return res.status(400).json({ message: "Cannot message yourself" });
    }

    let chat = await Conversation.findOne({
      participants: { $all: [senderId, receiver._id] },
    });

    // 🆕 CREATE PENDING CHAT ON FIRST MESSAGE
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

    const message = await Message.create({
      chatId: chat._id,
      senderId,
      receiverId: receiver._id,
      text,
    });

    chat.lastMessage = message._id;
    await chat.save();

    // 🔔 SOCKET
    // 🔔 SOCKET (SEND CHAT + MESSAGE)
    const receiverSocket = getReceiverSocketId(receiver._id.toString());
    const senderSocket = getReceiverSocketId(senderId.toString());

    // 🔥 populate chat for frontend
    const populatedChat = await Conversation.findById(chat._id)
      .populate("participants", "fullName profilePic userCode")
      .populate("lastMessage");

    const payload = {
      chat: populatedChat,
      message,
    };

    if (receiverSocket) io.to(receiverSocket).emit("newChatMessage", payload);

    if (senderSocket) io.to(senderSocket).emit("newChatMessage", payload);
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
    });

    if (unseenMessages.length > 0) {
      const seenAt = new Date();

      await Message.updateMany(
        {
          chatId: conversationId,
          receiverId: userId,
          seen: false,
        },
        { $set: { seen: true, seenAt } }
      );

      unseenMessages.forEach((msg) => {
        const senderSocket = getReceiverSocketId(msg.senderId.toString());
        if (senderSocket.length) {
          io.to(senderSocket).emit("messageSeen", {
            messageId: msg._id,
            seenAt,
          });
        }
      });
    }

    const messages = await Message.find({ chatId: conversationId });

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
    const { text, image, conversationId, revealAt } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    if (
      !conversation.acceptedBy &&
      conversation.createdBy.toString() !== senderId.toString()
    ) {
      return res.status(403).json({ message: "Chat not accepted yet" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const isTimed = !!revealAt;

    const newMessage = await Message.create({
      chatId: conversation._id,
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl || "",
      revealAt: isTimed ? new Date(revealAt) : null,
      revealed: !isTimed, // ✅ FIX
    });

    conversation.lastMessage = newMessage._id;
    await conversation.save();

    const payload = normalizeMessage(newMessage.toObject());

    io.to(conversation._id.toString()).emit("new_message", payload);

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
