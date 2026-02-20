import mongoose from "mongoose";

const chatMemorySchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    createdBy: String,
  },
  { timestamps: true }
);

const ChatMemory = mongoose.model("ChatMemory", chatMemorySchema);

export default ChatMemory;
