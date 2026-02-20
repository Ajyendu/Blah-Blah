import express from "express";
import ChatDNA from "../models/ChatDNA.js";
import generateChatDNA from "../lib/generateChatDNA.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/:chatId", protectRoute, async (req, res) => {
  try {
    const { chatId } = req.params;

    await generateChatDNA(chatId); // FORCE regenerate

    const dna = await ChatDNA.findOne({ chatId });

    res.json(dna);
  } catch (err) {
    console.error("DNA ROUTE ERROR:", err);
    res.status(500).json({ message: "DNA error" });
  }
});
export default router;
