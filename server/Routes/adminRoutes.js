import express from "express";
import { addMentor } from "../controller/adminController.js";

const router = express.Router();

router.post("/", addMentor); // Single endpoint for both operations

export default router;
