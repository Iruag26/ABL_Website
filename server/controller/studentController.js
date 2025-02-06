import Student from "../postgres/model/Student.js";
import StudentRoleMap from "../postgres/model/StudentRoleMap.js";

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

    // Store session data
    req.session.user = {
      id: student.s_id,
      username: student.s_username,
      role: "Student",
    };

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
        role_id: 2, // Check specifically for role_id = 2
      },
      attributes: ["student_id", "role_id"], // Select only the valid columns
    });

    if (role) {
      return res
        .status(200)
        .json({ message: `Student ID: ${studentId} has role_id = 2.` });
    } else {
      return res
        .status(404)
        .json({ message: `Student ID: ${studentId} does NOT have role_id = 2.` });
    }
  } catch (error) {
    console.error("Error checking student role:", error);
    return res.status(500).json({ error: "Failed to verify student role" });
  }
};





