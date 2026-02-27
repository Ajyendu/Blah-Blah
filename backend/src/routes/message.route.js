import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  deleteMessage, // ✅ ADD THIS
  getMessagesByConversation,
  sendMessageByCode,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/delete/:id", protectRoute, deleteMessage); // ✅ NOW VALID
router.post("/send-by-code", protectRoute, sendMessageByCode);
router.get(
  "/conversation/:conversationId",
  protectRoute,
  getMessagesByConversation,
);

export default router;
