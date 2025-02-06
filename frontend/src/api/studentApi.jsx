import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

// Function to fetch student credentials by username
export const fetchStudentCredentials = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/credentials/${username}`);
    return response.data; // Return the student credentials
  } catch (error) {
    console.error("Error fetching student credentials:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

// Check if user is logged in
export const checkSession = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/session`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Session check failed:", error);
    return null;
  }
};

export const getClubAdminStatus = async (s_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/verify-role/${s_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student credentials:", error);
    throw error; // Re-throw the error for the caller to handle
  }

}