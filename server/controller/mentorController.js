import Mentor from "../postgres/model/Mentor.js";

// Fetch mentor credentials by username
export const getMentorCredentials = async (req, res) => {
  const { username } = req.params; // Extract username from URL parameters
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
