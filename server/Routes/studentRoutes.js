import express from "express";
import { getClubAdminProfile, submitStudentEntry, getStudentInfo, getStudentActivityInfo, updateStudentActivity, fetchLatest20Events } from "../controller/studentController.js";
 

const router = express.Router();

router.post("/make-entry", submitStudentEntry);
router.get("/profile", getStudentInfo);
router.get("/student-activity", getStudentActivityInfo);
router.put("/update-activity/:a_id", updateStudentActivity);
router.get("/latest", fetchLatest20Events);
router.get("/cprofile", getClubAdminProfile);

export default router;


