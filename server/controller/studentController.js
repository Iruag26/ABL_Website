import Student from "../postgres/model/Student.js";
import StudentRoleMap from "../postgres/model/StudentRoleMap.js";
import StudentActivityParticipation from "../postgres/model/StudentActivityParticipation.js";
import Session from "../postgres/model/Session.js";
import StudentInfo from "../postgres/model/StudentInfo.js";
import Events from "../postgres/model/Events.js";
import ClubAdminInfo from "../postgres/model/ClubAdminInfo.js";

// Fetch student credentials by username
export const getStudentCredentials = async (req, res) => {
  const { username } = req.params; // Extract username from URL parameters
  try {
    const student = await Student.findOne({
      where: { s_username: username }, // Search by username
      attributes: ["s_id", "s_username", "s_password"], // Only retrieve specific fields
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student credentials:", error);
    res.status(500).json({ error: "Failed to fetch student credentials" });
  }
};

// See if the role_id has value '2'.
export const verifyStudentRole = async (req, res) => {
  const { s_id } = req.params;
  try {
    const studentId = parseInt(s_id, 10); // Convert to integer
    if (isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const role = await StudentRoleMap.findOne({
      where: {
        student_id: studentId,
        role_id: 2,
      },
      attributes: ["student_id", "role_id"],
    });

    if (role) {
      return res
        .status(200)
        .json({ message: `Student ID: ${studentId} has role_id = 2.` });
    } else {
      return res
        .status(404)
        .json({
          message: `Student ID: ${studentId} does NOT have role_id = 2.`,
        });
    }
  } catch (error) {
    console.error("Error checking student role:", error);
    return res.status(500).json({ error: "Failed to verify student role" });
  }
};

/**
 * Handles student activity entry submission.
 * Extracts session token, retrieves s_id, and inserts activity data.
 */
export const submitStudentEntry = async (req, res) => {
  try {
    // Extract session token from cookies
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res
        .status(401)
        .json({ error: "Session token missing. Please log in again." });
    }

    // Find session in the database
    const session = await Session.findOne({
      where: { session_token: sessionToken },
    });
    if (!session) {
      return res
        .status(401)
        .json({ error: "Invalid session. Please log in again." });
    }

    // Get `user_id` from session, which should match `s_id` in students table
    const sessionUserId = session.user_id;
    const studentIdConv = parseInt(sessionUserId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    // Find the corresponding student in the `students` table
    const student = await Student.findOne({ where: { s_id: studentIdConv } });

    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    const s_id = student.s_id; // Extract correct student ID

    // Extract activity details from request body
    const {
      a_name,
      a_type,
      a_sub_type,
      a_start_date,
      a_end_date,
      a_venue,
      a_level,
    } = req.body;

    // Insert new activity entry into `student_activity_participation`
    const newEntry = await StudentActivityParticipation.create({
      s_id,
      a_name,
      a_status: "Not Approved", // Default status
      a_type,
      a_sub_type: a_sub_type || null,
      a_start_date,
      a_end_date,
      a_venue,
      a_level,
      a_points_scored: null, // Initially NULL
    });

    return res
      .status(201)
      .json({ message: "Entry submitted successfully!", newEntry });
  } catch (error) {
    console.error("Error submitting student activity entry:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const getStudentInfo = async (req, res) => {
  try {
    // Extract session token from cookies
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res
        .status(401)
        .json({ error: "Session token missing. Please log in again." });
    }

    // Find session in the database
    const session = await Session.findOne({
      where: { session_token: sessionToken },
    });
    if (!session) {
      return res
        .status(401)
        .json({ error: "Invalid session. Please log in again." });
    }

    // Get `user_id` from session (which is the student ID)
    const studentId = session.user_id;
    const studentIdConv = parseInt(studentId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    // Fetch student details from `student_info`
    const student = await StudentInfo.findOne({
      where: { s_id: studentIdConv },
    });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student2 = await Student.findOne({
      where: { s_id: studentIdConv },
    });

    if (!student2) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      ...student.dataValues,
      s_username: student2.s_username,
    });
  } catch (error) {
    console.error("Error fetching student info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStudentActivityInfo = async (req, res) => {
  try {
    // Extract session token from cookies
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res
        .status(401)
        .json({ error: "Session token missing. Please log in again." });
    }

    // Find session in the database
    const session = await Session.findOne({
      where: { session_token: sessionToken },
    });
    if (!session) {
      return res
        .status(401)
        .json({ error: "Invalid session. Please log in again." });
    }

    // Get `user_id` from session (which is the student ID)
    const studentId = session.user_id;
    const studentIdConv = parseInt(studentId.replace(/[^0-9]+/g, ""), 10); // Convert to integer

    // Fetch student activities from `student_activity_participation`
    const activities = await StudentActivityParticipation.findAll({
      where: { s_id: studentIdConv },
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

    if (!activities || activities.length === 0) {
      return res
        .status(404)
        .json({ error: "No activities found for this student." });
    }

    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching student activity info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStudentActivity = async (req, res) => {
  try {
    const { a_id } = req.params;
    const {
      a_name,
      a_type,
      a_sub_type,
      a_start_date,
      a_end_date,
      a_venue,
      a_level,
    } = req.body;

    const updated = await StudentActivityParticipation.update(
      {
        a_name,
        a_type,
        a_sub_type,
        a_start_date,
        a_end_date,
        a_venue,
        a_level,
      },
      { where: { a_id } }
    );

    if (updated[0] === 0) {
      return res
        .status(404)
        .json({ error: "Activity not found or no changes made" });
    }

    return res.status(200).json({ message: "Activity updated successfully!" });
  } catch (error) {
    console.error("Error updating activity:", error);
    return res.status(500).json({ error: "Failed to update activity" });
  }
};

// ✅ Get latest 20 events sorted by date (descending)
export const fetchLatest20Events = async (req, res) => {
  try {
    const events = await Events.findAll({
      order: [["e_date", "DESC"]],
      limit: 20,
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("❌ Error fetching latest events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

export const getClubAdminProfile = async (req, res) => {
  try {
    console.log("HIHIHIHI")
    const sessionToken = req.cookies.sessionToken;
    if (!sessionToken) {
      return res
        .status(401)
        .json({ message: "Session token missing. Please log in again." });
    }
    // Find session in the database
    const session = await Session.findOne({
      where: { session_token: sessionToken },
    });
    if (!session) {
      return res
        .status(401)
        .json({ error: "Invalid session. Please log in again." });
    }

    // Get `user_id` from session (which is the student ID)
    const cstudentId = session.user_id;
    const cstudentIdConv = parseInt(cstudentId.replace(/[^0-9]+/g, ""), 10); // Convert to integer
    console.log("CID IS: ",cstudentIdConv)

    const clubadminstudent = await Student.findOne({ where: { s_id: cstudentIdConv } });
    if (!clubadminstudent) {
      return res.status(404).json({ message: "Club Admin not found" });
    }

    const studentInfo = await StudentInfo.findOne({
      where: { s_id: clubadminstudent.s_id },
    });

    const rollno = clubadminstudent.s_username;
    const clubInfo = await ClubAdminInfo.findOne({
      where: { rollno: parseInt(rollno) },
    });

    if (!studentInfo || !clubInfo) {
      return res
        .status(404)
        .json({ message: "Profile information incomplete" });
    }

    const profileData = {
      rollno,
      name: studentInfo.s_name,
      batch: studentInfo.s_batch,
      branch: studentInfo.s_branch,
      sem: studentInfo.s_sem,
      section: studentInfo.s_csec,
      club_name: clubInfo.club_name,
    };

    res.json(profileData);
  } catch (error) {
    console.error("❌ Error fetching club admin profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStudentInfoByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid or missing student IDs." });
    }

    const students = await StudentInfo.findAll({
      where: {
        s_id: ids,
      },
      attributes: ["s_id", "s_sem", "s_csec"], // only fetch what you need
    });

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students by IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
