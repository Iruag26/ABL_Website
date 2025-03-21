import express from "express";
import { addMentor, getMentorsByBranch, deleteMentor, incrementSemester, getStudentsWithPoints} from "../controller/adminController.js";

const router = express.Router();

router.post("/add-mentor", addMentor); 
router.get("/getMentors/:branch", getMentorsByBranch); // ✅ Updated route to use a path parameter
router.delete("/deleteMentor/:m_id", deleteMentor);
router.put("/incrementSemester/:m_id", incrementSemester);
router.get("/getStudents", getStudentsWithPoints);

export default router;

