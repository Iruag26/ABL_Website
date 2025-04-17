import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

// Function to fetch student credentials by username
export const fetchAdminCredentials = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/credentials/${username}`);
    return response.data; // Return the student credentials
  } catch (error) {
    console.error("Error fetching admin credentials:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getMentorsByBranch = async (branch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/getMentors/${branch}`); // ✅ Fixed route
    return response.data;
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
};

// ✅ Delete Mentor API Call
export const deleteMentor = async (m_id) => {
  await axios.delete(`${API_BASE_URL}/api/admin/deleteMentor/${m_id}`);
};

// ✅ Increment Semester API Call
export const incrementSemester = async (m_id) => {
  const response = await axios.put(`${API_BASE_URL}/api/admin/incrementSemester/${m_id}`);
  return response.data;
};

export const fetchStudentsByFilters = async (section, branch, semester) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/getStudents`, {
      params: { section, branch, semester }, // ✅ Send filters as query params
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

export const updateMentorDetails = async (m_id, updatedData) => {
  try {
    const response = await fetch(`http://localhost:5000/api/admin/update_mentor/${m_id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Failed to update mentor:", error);
    throw error;
  }
};

// api/adminApi.js
export const fetchMentorInsights = async (mentorId) => {
  const res = await fetch(`http://localhost:5000/api/admin/mentor-insights/${mentorId}`, {
    credentials: "include"
  });
  const data = await res.json();
  return data;
};

// ✅ New function to fetch type-wise student points
export const fetchStudentsTypeWise = async (section, branch, semester) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/getStudentsTypeWise`, {
      params: { section, branch, semester },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching type-wise students:", error);
    return [];
  }
};