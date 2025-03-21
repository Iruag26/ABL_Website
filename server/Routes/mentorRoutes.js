import express from "express";
import { assignPoints, fetchStudentDetails } from "../controller/mentorController.js";
import { getStudent } from "../controller/mentorController.js"; // Import controller function

const router = express.Router();

// Route to fetch students assigned to a mentor
router.get("/students", fetchStudentDetails);
router.get("/student_details/:student_id", getStudent);
router.put("/assign_points/:a_id", assignPoints);

export default router;