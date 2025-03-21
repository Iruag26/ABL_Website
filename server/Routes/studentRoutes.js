import express from "express";
import { submitStudentEntry, getStudentInfo, getStudentActivityInfo } from "../controller/studentController.js";

const router = express.Router();

router.post("/make-entry", submitStudentEntry);
router.get("/profile", getStudentInfo);
router.get("/student-activity", getStudentActivityInfo);

export default router;
