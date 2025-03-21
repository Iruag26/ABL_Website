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

export const FetchStudentList = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/mentor/students", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Student List:", data);
      return data; // Return student list
    } else {
      console.error("Failed to fetch students:", data.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

export const FetchStudentActivities = async (s_id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/mentor/student_details/${s_id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error("Failed to fetch student details:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
    return null;
  }
};


export const AssignActivityPoints = async (a_id, a_type, a_sub_type, a_level) => {
  try {
    const response = await fetch(`http://localhost:5000/api/mentor/assign_points/${a_id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ a_type, a_sub_type, a_level }), // ✅ Sending necessary details
    });

    const data = await response.json();
    if (response.ok) {
      console.log("✅ Points assigned successfully:", data);
      return data;
    } else {
      console.error("❌ Failed to assign points:", data.message);
      return null;
    }
  } catch (error) {
    console.error("❌ Error assigning points:", error);
    return null;
  }
};
