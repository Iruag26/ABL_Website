import express from "express";
import { generateTokenForUser, logoutUser } from "../controller/sessionController.js";

const router = express.Router();

router.post("/generate-token", generateTokenForUser);
router.post("/logout", logoutUser);

export default router;
