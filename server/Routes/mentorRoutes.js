import express from "express";
import {
  getMentorProfileFromSession,
  assignPoints,
  fetchStudentDetails,
  getStudent,
  deleteStudentActivity,
  getMentorBasicInsights,
} from "../controller/mentorController.js";
import { getStudentInfoByIds } from "../controller/studentController.js";

const router = express.Router();

router.get("/students", fetchStudentDetails);
router.get("/student_details/:student_id", getStudent);
router.put("/assign_points/:a_id", assignPoints);
router.delete("/delete_activity/:a_id", deleteStudentActivity);
router.get("/mentor-insights/:mentorId", getMentorBasicInsights);

// ✅ Final working route
router.get("/profile", getMentorProfileFromSession);
router.post("/students/info-by-id", getStudentInfoByIds);

export default router;




