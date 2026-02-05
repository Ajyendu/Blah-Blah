import dotenv from "dotenv";
import cors from "cors";
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

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ CREATE SERVER

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

/* ================= MIDDLEWARE ================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://lawerence-unbossed-wallace.ngrok-free.dev",
    ],
    credentials: true,
  })
);

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/ready", readyRoutes);

/* ================= HEALTH ================= */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ================= PROD ================= */
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

/* ================= SOCKET ================= */
initSocket(server); // ✅ ATTACH SOCKET.IO

function startTimedMessageScheduler() {
  setInterval(async () => {
    try {
      const now = new Date();

      const messages = await Message.find({
        revealed: false,
        revealAt: { $lte: now },
        deleted: { $ne: true },
      });

      for (const msg of messages) {
        msg.revealed = true;
        await msg.save();

        if (io) {
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
