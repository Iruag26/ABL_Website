import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

// Function to fetch student credentials by username
export const fetchMentorCredentials = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/mentor/credentials/${username}`);
    return response.data; // Return the student credentials
  } catch (error) {
    console.error("Error fetching admin credentials:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};