import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { protectRoute } from "../middleware/auth.middleware.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOAD_DIR = path.join(__dirname, "..", "..", "uploads", "watch-party");
const MAX_SIZE_MB = 100;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

try {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
} catch (e) {
  // ignore
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || ".mp4";
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    const ok = /^video\//.test(file.mimetype) || /\.(mp4|webm|ogg|mov)$/i.test(file.originalname);
    if (ok) cb(null, true);
    else cb(new Error("Only video files are allowed"), false);
  },
});

const router = express.Router();

router.post("/upload", protectRoute, upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No video file uploaded" });
  }
  const baseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
  const url = `${baseUrl}/api/watch-party/video/${req.file.filename}`;
  res.json({ url });
});

router.get("/video/:filename", (req, res) => {
  const filename = path.basename(req.params.filename);
  if (!filename || filename.includes("..")) {
    return res.status(400).send("Invalid filename");
  }
  const filePath = path.join(UPLOAD_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Not found");
  }
  res.sendFile(path.resolve(filePath));
});

export default router;
