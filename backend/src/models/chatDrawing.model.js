import mongoose from "mongoose";

const chatDrawingSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      unique: true,
    },
    imageData: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

chatDrawingSchema.index({ chatId: 1 });

export default mongoose.model("ChatDrawing", chatDrawingSchema);
