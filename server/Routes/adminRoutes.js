import express from "express";
import {
    addMentor,
    getMentorsByBranch,
    deleteMentor,
    incrementSemester,
    getStudentsWithPoints,
    updateMentorDetails, // ✅ import
    getMentorInsights,
    getStudentsWithTypeWisePoints,
    getStudentReportData
  } from "../controller/adminController.js";
  
const router = express.Router();

router.get("/getStudentsTypeWise", getStudentsWithTypeWisePoints);
router.post("/add-mentor", addMentor); 
router.get("/getMentors/:branch", getMentorsByBranch); // ✅ Updated route to use a path parameter
router.delete("/deleteMentor/:m_id", deleteMentor);
router.put("/incrementSemester/:m_id", incrementSemester);
router.get("/getStudents", getStudentsWithPoints);
router.put("/update_mentor/:m_id", updateMentorDetails); 
router.get("/mentor-insights/:mentorId", getMentorInsights);
router.get("/activities/:id", getStudentReportData); // ✅ Admin-exclusive


export default router;
