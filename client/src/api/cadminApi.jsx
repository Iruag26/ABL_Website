import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchClubAdminProfile = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/student/cprofile`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch Club Admin Profile:", err);
    throw err;
  }
};
