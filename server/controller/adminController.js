import Admin from "../postgres/model/Admin.js";
import Mentor from "../postgres/model/Mentor.js";
import MentorInfo from "../postgres/model/MentorInfo.js";
import multer from "multer"; // For file uploads

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
  const { m_username, m_password, m_name, m_batch, m_sem, m_csec, m_branch } =
    req.body;

  try {
    // Insert mentor authentication data into the Mentor table
    const newMentor = await Mentor.create({
      m_username,
      m_password,
      m_name,
    });

    // Insert mentor additional details into the MentorInfo table
    const newMentorInfo = await MentorInfo.create({
      m_id: newMentor.m_id, // Use the generated ID from the Mentor table
      m_batch,
      m_sem,
      m_csec,
      m_branch,
    });

    res.status(201).json({
      message: "Mentor added successfully!",
      mentor: newMentor,
      mentorInfo: newMentorInfo,
    });
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ error: "Failed to add mentor data." });
  }
};
