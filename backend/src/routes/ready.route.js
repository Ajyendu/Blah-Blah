import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Health check endpoint
router.get("/", (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  if (!isConnected) {
    return res.status(503).json({
      status: "not-ready",
      database: "connecting"
    });
  }

  res.status(200).json({
    status: "ready",
    database: "connected"
  });
});

export default router; 