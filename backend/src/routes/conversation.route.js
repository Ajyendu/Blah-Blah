import {
  acceptChat,
  getMyChats,
  getMyFriends,
  rejectChat,
  removeFriend,
} from "../controllers/conversation.controller.js";
import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my", protectRoute, getMyChats);
router.get("/friends", protectRoute, getMyFriends);
router.post("/accept", protectRoute, acceptChat);
router.post("/reject", protectRoute, rejectChat);
router.post("/remove", protectRoute, removeFriend);

export default router;
