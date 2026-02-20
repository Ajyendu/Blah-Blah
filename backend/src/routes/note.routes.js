import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  toggleNote,
  getChatNotes,
  deleteNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/toggle", protectRoute, toggleNote);
router.get("/:chatId", protectRoute, getChatNotes);
router.delete("/:id", protectRoute, deleteNote);

export default router;
