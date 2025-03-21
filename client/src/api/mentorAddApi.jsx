import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

// Function to add mentor
export const addMentor = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/admin/add-mentor`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding mentor:", error);
    throw error;
  }
};

