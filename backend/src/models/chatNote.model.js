import mongoose from "mongoose";

const chatNoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    previewText: {
      type: String,
      required: true,
    },
    messageCreatedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

chatNoteSchema.index({ userId: 1, chatId: 1, messageId: 1 }, { unique: true });

export default mongoose.model("ChatNote", chatNoteSchema);
