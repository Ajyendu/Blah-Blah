import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getDrawing, saveDrawing } from "../controllers/drawing.controller.js";

const router = express.Router();

router.get("/:chatId", protectRoute, getDrawing);
router.put("/:chatId", protectRoute, saveDrawing);

export default router;
