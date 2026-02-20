import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Conversation from "../models/conversation.model.js";
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
        { $set: { seen: true, seenAt } }
      );

      unseenMessages.forEach((msg) => {
        const senderSocket = getReceiverSocketId(msg.senderId.toString());
        if (senderSocket) {
          io.to(senderSocket).emit("messageSeen", {
            messageId: msg._id,
            seenAt,
          });
        }
      });
    }

    const messages = await Message.find({
      chatId: conversationId,
      $or: [
        { visibleTo: { $size: 0 } }, // normal messages
        { visibleTo: userId }, // private visible
      ],
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

    // ================= PRIVATE AI DETECT =================
    const isPrivateAI = text?.trim().toLowerCase().startsWith("@buddy");

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const isTimed = !!revealAt;
    const BOT_ID = "6997e34d5bfffd55ff54458d";

    // ================= USER MESSAGE =================
    const newMessage = await Message.create({
      chatId: conversation._id,
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl || "",
      revealAt: isTimed ? new Date(revealAt) : null,
      revealed: !isTimed,
      isPrivateAI,
      visibleTo: isPrivateAI ? [senderId] : [],
    });

    const payload = normalizeMessage(newMessage.toObject());

    // ================= SOCKET EMIT =================
    if (!isPrivateAI) {
      const senderSocket = getReceiverSocketId(senderId.toString());
      const receiverSocket = getReceiverSocketId(receiverId.toString());

      if (senderSocket) {
        io.to(senderSocket).emit("new_message", payload);
      }

      if (receiverSocket) {
        io.to(receiverSocket).emit("new_message", payload);
      }
    }

    if (isPrivateAI) {
      const senderSocket = getReceiverSocketId(senderId.toString());

      // 🔥 send user message only to sender
      if (senderSocket) {
        io.to(senderSocket).emit("new_message", payload);
        io.to(senderSocket).emit("bot_typing", true);
      }

      const cleanPrompt = text.replace(/@buddy/i, "").trim();

      // ================= RATE LIMIT =================
      const lastUsed = aiUsageMap.get(senderId.toString()) || 0;
      if (Date.now() - lastUsed < 3000) {
        if (senderSocket) {
          io.to(senderSocket).emit("bot_typing", false);
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

      if (senderSocket) {
        io.to(senderSocket).emit("bot_typing", false);
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

      if (senderSocket) {
        io.to(senderSocket).emit("new_message", botPayload);
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
