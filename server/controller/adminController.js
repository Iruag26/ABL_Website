import Admin from "../postgres/model/Admin.js";
import Mentor from "../postgres/model/Mentor.js";
import MentorInfo from "../postgres/model/MentorInfo.js";
import multer from "multer"; // For file uploads
import StudentInfo from "../postgres/model/StudentInfo.js";
import StudentActivityParticipation from "../postgres/model/StudentActivityParticipation.js";
import { Op } from "sequelize";

export const getAdminCredentials = async (req, res) => {
  const { username } = req.params; // Extract username from URL parameters
  try {
    const ad = await Admin.findOne({
      where: { a_username: username }, // Search by username
      attributes: ["a_id", "a_username", "a_password"], // Only retrieve specific fields
    });
    if (!ad) {
      return res.status(404).json({ error: "admin not found" });
    }
    res.status(200).json(ad);
  } catch (error) {
    console.error("Error fetching admin credentials:", error);
    res.status(500).json({ error: "Failed to fetch admin credentials" });
  }
};

export const addMentor = async (req, res) => {
  try {
    const { m_username, m_password, m_name, m_batch, m_sem, m_csec, m_branch } = req.body;

    if (!m_username || !m_password || !m_name || !m_batch || !m_sem || !m_csec || !m_branch) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Insert into `mentors` table without manually setting `m_id`
    const newMentor = await Mentor.create({
      m_username,
      m_password,
      m_name,
    });

    // ✅ Insert into `mentor_info` using the auto-generated `m_id`
    await MentorInfo.create({
      m_id: newMentor.m_id, // ✅ Correctly referencing auto-generated ID
      m_batch,
      m_sem,
      m_csec,
      m_branch,
    });

    res.status(201).json({ message: "Mentor added successfully!" });
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMentorsByBranch = async (req, res) => {
  try {
    const { branch } = req.params;
    if (!branch) {
      return res.status(400).json({ error: "Branch parameter is required" });
    }

    // ✅ Step 1: Get all mentor details (m_id included) from mentor_info
    const mentorDetails = await MentorInfo.findAll({
      where: { m_branch: branch },
    });

    if (!mentorDetails.length) {
      return res.status(404).json({ error: "No mentors found for this branch" });
    }

    // ✅ Step 2: Extract all m_id values from mentorDetails
    const mentorIds = mentorDetails.map((mentor) => mentor.m_id);

    // ✅ Step 3: Get mentor names using m_id
    const mentorNames = await Mentor.findAll({
      where: { m_id: mentorIds },
      attributes: ["m_id", "m_name"], // Fetch only m_id & name
    });

    // ✅ Step 4: Convert mentorNames array into a map for quick lookup
    const mentorNameMap = {};
    mentorNames.forEach((mentor) => {
      mentorNameMap[mentor.m_id] = mentor.m_name;
    });

    // ✅ Step 5: Combine mentor details with their names
    const finalMentorData = mentorDetails.map((mentor) => ({
      m_id: mentor.m_id,
      m_name: mentorNameMap[mentor.m_id] || "Unknown", // If name not found, set to "Unknown"
      m_batch: mentor.m_batch,
      m_sem: mentor.m_sem,
      m_csec: mentor.m_csec,
      m_branch: mentor.m_branch,
    }));

    res.status(200).json(finalMentorData);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Delete Mentor
export const deleteMentor = async (req, res) => {
  try {
    const { m_id } = req.params;

    // Delete mentor from both tables
    await Mentor.destroy({ where: { m_id } });
    await MentorInfo.destroy({ where: { m_id } });

    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ error: "Failed to delete mentor" });
  }
};

// ✅ Increment Semester
export const incrementSemester = async (req, res) => {
  try {
    const { m_id } = req.params;

    // Find mentor and increment semester
    const mentor = await MentorInfo.findOne({ where: { m_id } });
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    if (mentor.m_sem >= 8) {
      return res.status(400).json({ error: "Cannot increment beyond semester 8" });
    }

    mentor.m_sem += 1;
    await mentor.save();

    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error incrementing semester:", error);
    res.status(500).json({ error: "Failed to increment semester" });
  }
};



export const getStudentsWithPoints = async (req, res) => {
  try {
    const { section, branch, semester } = req.query;

    if (!section || !branch || !semester) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // ✅ Fetch Students Matching Criteria
    const students = await StudentInfo.findAll({
      where: {
        s_csec: section,
        s_branch: branch,
        s_sem: semester,
      },
      attributes: ["s_id", "s_name", "s_batch", "s_sem", "s_csec", "s_branch"],
      raw: true, // ✅ Flatten results
    });

    if (!students.length) {
      return res.status(404).json({ message: "No students found." });
    }

    // ✅ Fetch & Calculate Total Activity Points Per Student
    for (let student of students) {
      const totalPoints = await StudentActivityParticipation.sum("a_points_scored", {
        where: {
          s_id: student.s_id,
          a_status: "Approved", // ✅ Only count approved activities
        },
      });

      student.total_points = totalPoints || 0; // Default to 0 if no activities found
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
