import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import { corsOptions } from "./lib/corsConfig.js";
import cookieParser from "cookie-parser";
import path from "path";
import express from "express";
import http from "http";
import Message from "./models/message.model.js";
import { connectDB } from "./lib/db.js";
import { initSocket, io, getConnectedSocketCount } from "./lib/socket.js";
import {
  recordHttp,
  getHttpLatencyPercentilesMs,
  getHttpCounters,
} from "./lib/metrics.js";
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
// CORS first. Preview URLs (e.g. *.vercel.app) are whitelisted in corsConfig.
app.use(cors(corsOptions));
// Do not compress OPTIONS — some proxies/clients mishandle compressed preflights.
app.use(
  compression({
    filter: (req, res) => {
      if (req.method === "OPTIONS") return false;
      return compression.filter(req, res);
    },
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const ms = Number(process.hrtime.bigint() - start) / 1e6;
    recordHttp(ms, res.statusCode);
  });
  next();
});

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

const metricsAllowed = () =>
  process.env.METRICS_ENABLED === "true" || process.env.NODE_ENV !== "production";

app.get("/metrics", (req, res) => {
  if (!metricsAllowed()) {
    return res.status(404).json({ error: "not found" });
  }
  const lat = getHttpLatencyPercentilesMs();
  const ctr = getHttpCounters();
  const errorRate =
    ctr.requestsTotal > 0
      ? (ctr.responses4xx + ctr.responses5xx) / ctr.requestsTotal
      : 0;
  res.status(200).json({
    uptimeSec: Math.floor(process.uptime()),
    http: {
      ...ctr,
      errorRateApprox: Number(errorRate.toFixed(6)),
      latencyMs: lat,
    },
    sockets: {
      connected: getConnectedSocketCount(),
    },
    pid: process.pid,
  });
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
// Connect MongoDB before listening so Render never routes traffic to a dying process,
// and /health only matters after DB is ready (avoids flaky 502s right after deploy).
async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err?.message || err);
    process.exit(1);
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server listening on port ${PORT}`);
    startTimedMessageScheduler();
    console.log("⏰ Timed message scheduler started");
  });
}

start();
