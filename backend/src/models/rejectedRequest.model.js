import mongoose from "mongoose";

const rejectedRequestSchema = new mongoose.Schema(
  {
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rejectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rejectedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { timestamps: true },
);

rejectedRequestSchema.index({ requesterId: 1, rejectorId: 1, rejectedAt: -1 });

const RejectedRequest = mongoose.model(
  "RejectedRequest",
  rejectedRequestSchema,
);

export default RejectedRequest;
