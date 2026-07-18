// routes/chat.routes.js
import { Router } from "express";
import { postChat } from "../controllers/chat.controller.js";

const router = Router();

// POST /api/chat
router.post("/chat", postChat);

export default router;