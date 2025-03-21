import Mentor from "../postgres/model/Mentor.js";
import Session from "../postgres/model/Session.js";
import Student from "../postgres/model/Student.js";
import StudentInfo from "../postgres/model/StudentInfo.js";
import MentorInfo from "../postgres/model/MentorInfo.js";
import StudentActivityParticipation from "../postgres/model/StudentActivityParticipation.js"

export const getMentorCredentials = async (req, res) => {
  const { username } = req.params; 
  try {
    const mentor = await Mentor.findOne({
      where: { m_username: username }, // Search by username
      attributes: ["m_username", "m_password"], // Only retrieve specific fields
    });
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }
    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error fetching mentor credentials:", error);
    res.status(500).json({ error: "Failed to fetch mentor credentials" });
  }
};

export const fetchStudentDetails = async (req, res) => {
  try {
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res.status(401).json({ error: "Session token missing. Please log in again." });
    }

    // m_id in req convert to int✅
    // fetch m_id and m_batch, m_sem, m_csec, m_branch from m_info✅
    // fetch s_id and s_names rows in s_info whose s_batch, s_sem, s_csec, s_branch correspond to m_info✅
    // fetch s_username using s_id in students table
    // send s_username and s_names corres s_id

    // Find session in the database
    const session = await Session.findOne({ where: { session_token: sessionToken } });
    if (!session) {
      return res.status(401).json({ error: "Invalid session. Please log in again." });
    }

    //1. Get `user_id` from session, which should match `m_id` in mentor_info table
    const sessionUserId = session.user_id;
    const mentorIdConv = parseInt(sessionUserId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    //2. fetch m_info
    const mentorDetails = await MentorInfo.findOne({
      where: { m_id: mentorIdConv },
      attributes: ["m_id", "m_batch", "m_sem", "m_csec", "m_branch"], // Select only required fields
    });

    if (!mentorDetails) {
      return res.status(404).json({ error: "Mentor not found." });
    }

    //3. find matching student info
    const students = await StudentInfo.findAll({
      where: {
        s_batch: mentorDetails.m_batch,
        s_sem: mentorDetails.m_sem,
        s_csec: mentorDetails.m_csec,
        s_branch: mentorDetails.m_branch,
      },
      attributes: ["s_id", "s_name"], // Fetch only s_id and s_name
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found for this mentor." });
    }

    //4. Fetch `s_username` from `students` table using `s_id`
    const studentIds = students.map(student => student.s_id); // Extract student IDs
    const studentUsernames = await Student.findAll({
      where: { s_id: studentIds },
      attributes: ["s_id", "s_username"], // Fetch corresponding usernames
    });

    //5. Merge `s_username` with `s_name`
    const studentData = students.map(student => {
      const usernameRecord = studentUsernames.find(user => user.s_id === student.s_id);
      return {
        s_id: student.s_id,
        s_name: student.s_name,
        s_username: usernameRecord ? usernameRecord.s_username : null, // Ensure null if not found
      };
    });

    //6. Send final response
    res.status(200).json(studentData);

  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getStudent = async (req, res) => {
  const { student_id } = req.params;

  // Convert student_id to integer and validate
  const studentId = parseInt(student_id, 10);
  if (isNaN(studentId)) {
    return res.status(400).json({ error: "Invalid student_id" });
  }

  try {
    const studentDetails = await StudentActivityParticipation.findAll({
      where: { s_id: studentId }, // Use parsed integer
      attributes: [
        "a_id",
        "a_name",
        "a_status",
        "a_type",
        "a_sub_type",
        "a_start_date",
        "a_end_date",
        "a_venue",
        "a_level",
        "a_points_scored",
      ],
    });

    if (!studentDetails || studentDetails.length === 0) {
      return res.status(404).json({ error: "Student activities not found" });
    }

    res.status(200).json(studentDetails);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ error: "Failed to fetch student details" });
  }
};

export const assignPoints = async (req, res) => {
  const { a_id } = req.params;
  const { a_type, a_sub_type, a_level } = req.body;

  if (!a_id || !a_type || !a_sub_type) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // ✅ **Points Mapping**
    const pointsMapping = {
      Technical: {
        "Attended/Organised Seminar": 1,
        "Delivering Seminar": 2,
        "Attended Workshop": 2,
        "Organized Workshop": 1,
        "Delivered Workshop": 3,
        "Attended/Organized Competition": 1,
        "Won Competition": null, // Special case handled below
      },
      Social: {
        "Donated Blood": 2,
        "Other Social Work": 1,
      },
      Sports: {
        "Participated": 1,
        "Won Competition": null, // Special case handled below
      },
      Cultural: {
        "Participated": 1,
        "Won Competition": null, // Special case handled below
      },
      Internship: {
        "Technical Internship": 3,
        "Managerial Internship": 2,
        "Field Trip": 1,
      },
    };

    const levelMapping = {
      "Intra-Collegiate": 2,
      "Inter-Collegiate(University-Level)": 2,
      "State Level": 3,
      "National Level": 4,
      "International Level": 5,
    };

    // ✅ **Assign Points**
    let points = pointsMapping[a_type]?.[a_sub_type] || 0;

    // If "Won Competition", add points based on a_level
    if (a_sub_type === "Won Competition" && a_level) {
      points = levelMapping[a_level] || 0;
    }

    // ✅ **Update Database**
    const updatedActivity = await StudentActivityParticipation.update(
      { a_points_scored: points, a_status: "Approved" },
      { where: { a_id } }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    return res.status(200).json({ message: "Points assigned successfully!", points });
  } catch (error) {
    console.error("❌ Error assigning points:", error);
    return res.status(500).json({ error: "Failed to assign points" });
  }
};

