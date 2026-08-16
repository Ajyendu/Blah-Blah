import ChatDrawing from "../models/chatDrawing.model.js";
import Conversation from "../models/conversation.model.js";
import { TTL, cacheGet, cacheKey, cacheSet } from "../lib/cache.js";

async function ensureParticipant(userId, chatId) {
  const key = cacheKey.conversation(chatId);
  let conv = await cacheGet(key);
  if (!conv) {
    conv = await Conversation.findById(chatId).select("participants").lean();
    if (conv) await cacheSet(key, conv, TTL.conversation);
  }
  if (!conv) return false;
  const isParticipant = (conv.participants || []).some(
    (p) => p && p.toString() === userId.toString(),
  );
  return isParticipant;
}

/** GET drawing for a chat. Returns { imageData } or { imageData: null }. */
export const getDrawing = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;
    if (!chatId) return res.status(400).json({ message: "chatId required" });

    const allowed = await ensureParticipant(userId, chatId);
    if (!allowed)
      return res.status(403).json({ message: "Not a participant in this chat" });

    const doc = await ChatDrawing.findOne({ chatId }).select("imageData").lean();
    res.json({ imageData: doc?.imageData ?? null });
  } catch (err) {
    console.error("getDrawing error:", err);
    res.status(500).json({ message: "Failed" });
  }
};

/** PUT save drawing for a chat. Body: { imageData } (base64 string). */
export const saveDrawing = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId } = req.params;
    const { imageData } = req.body ?? {};
    if (!chatId) return res.status(400).json({ message: "chatId required" });

    const allowed = await ensureParticipant(userId, chatId);
    if (!allowed)
      return res.status(403).json({ message: "Not a participant in this chat" });

    await ChatDrawing.findOneAndUpdate(
      { chatId },
      { $set: { imageData: typeof imageData === "string" ? imageData : "" } },
      { upsert: true, new: true },
    );
    res.json({ success: true });
  } catch (err) {
    console.error("saveDrawing error:", err);
    res.status(500).json({ message: "Failed" });
  }
};
