import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  sendMessage,
  deleteMessage,
  getMessagesByConversation,
  sendMessageByCode,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get(
  "/conversation/:conversationId",
  protectRoute,
  getMessagesByConversation,
);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/delete/:id", protectRoute, deleteMessage);
router.post("/send-by-code", protectRoute, sendMessageByCode);

export default router;
