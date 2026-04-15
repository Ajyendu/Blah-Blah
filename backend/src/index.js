import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import path from "path";
import express from "express";
import http from "http";
import Message from "./models/message.model.js";
import { connectDB } from "./lib/db.js";
import { initSocket } from "./lib/socket.js";
import { io } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import conversationRoutes from "./routes/conversation.route.js";
import readyRoutes from "./routes/ready.route.js";
import noteRoutes from "./routes/note.routes.js";
import drawingRoutes from "./routes/drawing.route.js";
import chatDNARoutes from "./routes/chatDNA.js";
import watchPartyRoutes from "./routes/watchParty.route.js";
dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ CREATE SERVER

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

/* ================= MIDDLEWARE ================= */
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: true, // 🔥 allow any origin (DEV ONLY)
    credentials: true,
  }),
);

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/ready", readyRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/drawings", drawingRoutes);
app.use("/api/chat-dna", chatDNARoutes);
app.use("/api/watch-party", watchPartyRoutes);

/* ================= HEALTH ================= */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ================= PROD ================= */

/* ================= SOCKET ================= */
initSocket(server); // ✅ ATTACH SOCKET.IO

function startTimedMessageScheduler() {
  setInterval(async () => {
    try {
      const now = new Date();

      const pending = await Message.find({
        revealed: false,
        revealAt: { $lte: now },
        deleted: { $ne: true },
      })
        .select("_id chatId")
        .lean();

      if (!pending.length) return;

      await Message.updateMany(
        { _id: { $in: pending.map((m) => m._id) } },
        { $set: { revealed: true } },
      );

      if (io) {
        for (const msg of pending) {
          io.to(msg.chatId.toString()).emit("message-revealed", {
            messageId: msg._id,
          });
        }
      }
    } catch (err) {
      // 🔥 swallow error so process never dies
      console.error("⏰ Scheduler error (safe):", err.message);
    }
  }, 1000);
}

/* ================= START ================= */
server.listen(PORT, "0.0.0.0", async () => {
  console.log(`✅ Server running on port ${PORT}`);

  try {
    await connectDB();
    startTimedMessageScheduler();
    console.log("⏰ Timed message scheduler started");
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
});
