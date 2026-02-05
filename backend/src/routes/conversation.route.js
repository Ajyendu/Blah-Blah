import {
  acceptChat,
  getMyChats,
  rejectChat,
} from "../controllers/conversation.controller.js";
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my", protectRoute, getMyChats);
router.post("/accept", protectRoute, acceptChat);
router.post("/reject", protectRoute, rejectChat);

export default router;
