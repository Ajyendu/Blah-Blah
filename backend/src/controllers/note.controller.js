import ChatNote from "../models/chatNote.model.js";
import Message from "../models/message.model.js";

/* ⭐ TOGGLE IMPORTANT */
// export const searchNote = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { chatId, messageId } = req.query;

//     if (!chatId || !messageId) {
//       return res.status(400).json({ message: "Invalid request" });
//     }

//     const existing = await ChatNote.findOne({
//       userId,
//       chatId,
//       messageId,
//     });

//     if (existing) {
//       await existing.deleteOne();
//       return res.json({ saved: true });
//     } else {
//       return res.json({ saved: false });
//     }
//   } catch (err) {
//     console.error("searchNote error:", err);
//     res.status(500).json({ message: "Failed" });
//   }
// };

export const toggleNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, messageId } = req.body;

    if (!chatId || !messageId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const existing = await ChatNote.findOne({
      userId,
      chatId,
      messageId,
    });

    if (existing) {
      await existing.deleteOne();
      return res.json({ saved: false });
    }

    const msg = await Message.findById(messageId);
    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }

    let preview = "";
    if (msg.text?.trim()) preview = msg.text.slice(0, 120);
    else if (msg.image) preview = "📷 Image";
    else preview = "Message";

    const note = await ChatNote.create({
      userId,
      chatId,
      messageId,
      previewText: preview,
      messageCreatedAt: msg.createdAt, // 🔥 IMPORTANT
    });

    res.json({ saved: true, note });
  } catch (err) {
    console.error("toggleNote error:", err);
    res.status(500).json({ message: "Failed" });
  }
};

/* 📄 GET NOTES FOR CHAT */
export const getChatNotes = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;

    const notes = await ChatNote.find({ userId, chatId }).sort({
      createdAt: 1,
    });

    res.json(notes);
  } catch (err) {
    console.error("getChatNotes error:", err);
    res.status(500).json({ message: "Failed" });
  }
};

/* 🧹 DELETE NOTE */
export const deleteNote = async (req, res) => {
  try {
    const note = await ChatNote.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // 🔐 Prevent deleting someone else's note
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await note.deleteOne();

    res.json({ success: true });
  } catch (err) {
    console.error("deleteNote error:", err);
    res.status(500).json({ message: "Failed" });
  }
};
