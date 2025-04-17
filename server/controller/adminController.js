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

export const updateMentorDetails = async (req, res) => {
  try {
    const { m_id } = req.params;
    const { m_name, m_batch, m_sem, m_csec } = req.body;

    if (!m_id || !m_name || !m_batch || !m_sem || !m_csec) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Update name in `mentor` table
    const mentor = await Mentor.findByPk(m_id);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    mentor.m_name = m_name;
    await mentor.save();

    // ✅ Update details in `mentor_info`
    const mentorInfo = await MentorInfo.findOne({ where: { m_id } });
    if (!mentorInfo) {
      return res.status(404).json({ error: "Mentor info not found" });
    }
    mentorInfo.m_batch = m_batch;
    mentorInfo.m_sem = m_sem;
    mentorInfo.m_csec = m_csec;
    await mentorInfo.save();

    res.status(200).json({ message: "Mentor updated successfully" });
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ error: "Failed to update mentor" });
  }
};

// controller/adminController.js
export const getMentorInsights = async (req, res) => {
  const { mentorId } = req.params;

  try {
    const mentor = await Mentor.findByPk(mentorId);
    const mentorInfo = await MentorInfo.findOne({ where: { m_id: mentorId } });

    if (!mentor || !mentorInfo) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    // Fetch students under this mentor
    const students = await StudentInfo.findAll({
      where: {
        s_batch: mentorInfo.m_batch,
        s_sem: mentorInfo.m_sem,
        s_csec: mentorInfo.m_csec,
        s_branch: mentorInfo.m_branch
      }
    });

    const studentIds = students.map((s) => s.s_id);
    const totalStudents = studentIds.length;

    // Fetch activity points per type
    const categories = ["Technical", "Cultural", "Sports", "Social", "Internship"];
    const activityPoints = {};

    for (let type of categories) {
      const points = await StudentActivityParticipation.sum("a_points_scored", {
        where: {
          s_id: studentIds,
          a_type: type,
          a_status: "Approved"
        }
      });
      activityPoints[type] = points || 0;
    }

    const response = {
      m_name: mentor.m_name,
      m_batch: mentorInfo.m_batch,
      m_sem: mentorInfo.m_sem,
      m_csec: mentorInfo.m_csec,
      m_branch: mentorInfo.m_branch,
      total_students: totalStudents,
      activityPoints
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching mentor insights:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📁 controller/adminController.js


export const getStudentsWithTypeWisePoints = async (req, res) => {
  try {
    const { section, branch, semester } = req.query;

    if (!section || !branch || !semester) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Step 1: Fetch matching students
    const students = await StudentInfo.findAll({
      where: {
        s_csec: section,
        s_branch: branch,
        s_sem: semester,
      },
      attributes: ["s_id", "s_name", "s_batch", "s_sem", "s_csec", "s_branch"],
      raw: true,
    });

    if (!students.length) {
      return res.status(404).json({ message: "No students found." });
    }

    // Step 2: For each student, get total and type-wise approved points
    for (let student of students) {
      const activities = await StudentActivityParticipation.findAll({
        where: {
          s_id: student.s_id,
          a_status: "Approved",
        },
        attributes: ["a_type", "a_points_scored"],
        raw: true,
      });

      let categoryPoints = {
        Technical: 0,
        Cultural: 0,
        Sports: 0,
        Social: 0,
        Internship: 0,
      };

      activities.forEach((act) => {
        if (act.a_type in categoryPoints && act.a_points_scored !== null) {
          categoryPoints[act.a_type] += act.a_points_scored;
        }
      });

      student.technical_points = categoryPoints.Technical;
      student.cultural_points = categoryPoints.Cultural;
      student.sports_points = categoryPoints.Sports;
      student.social_points = categoryPoints.Social;
      student.internship_points = categoryPoints.Internship;

      student.total_points = Object.values(categoryPoints).reduce((a, b) => a + b, 0);
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("❌ Error fetching type-wise points:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getStudentReportData = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await StudentInfo.findOne({ where: { s_id: studentId } });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const activities = await StudentActivityParticipation.findAll({
      where: {
        s_id: studentId,
        a_status: "Approved"
      },
      order: [["a_start_date", "ASC"]]
    });

    const totalPoints = activities.reduce(
      (sum, act) => sum + (act.a_points_scored || 0),
      0
    );

    const fullStudent = {
      ...student.toJSON(),
      total_points: totalPoints
    };

    res.json({ student: fullStudent, activities });
  } catch (error) {
    console.error("Error generating student report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
