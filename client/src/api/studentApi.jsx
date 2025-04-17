import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const fetchStudentCredentials = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/credentials/${username}`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching student credentials:", error);
    throw error; 
  }
};

export const getClubAdminStatus = async (s_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/verify-role/${s_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student credentials:", error);
    throw error;
  }

}

export const submitStudentEntry = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/student/make-entry`, formData, {
      withCredentials: true, 
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error submitting student entry:", error);
    throw error; 
  }
};

export const fetchStudentInfo = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/student/profile", {
      method: "GET",
      credentials: "include", // Send cookies
    });

    console.log("🔍 API Response Object:", response);

    const text = await response.text(); // Get raw response
    console.log("🔍 Response Text (Before JSON Parsing):", text);

    const data = JSON.parse(text); // Convert to JSON
    console.log("✅ Parsed JSON Data:", data);

    return data;
  } catch (error) {
    console.error("❌ Error fetching student info:", error);
    return null;
  }
};

export const fetchStudentActivityInfo = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/student/student-activity", {
      method: "GET",
      credentials: "include", // Send cookies
    });

    console.log("🔍 API Response Object:", response);

    const text = await response.text(); // Get raw response
    console.log("🔍 Response Text (Before JSON Parsing):", text);

    const data = JSON.parse(text); // Convert to JSON
    console.log("✅ Parsed JSON Data:", data);

    return data;
  } catch (error) {
    console.error("❌ Error fetching student info:", error);
    return null;
  }
};

export const updateStudentActivity = async (a_id, updatedData) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/student/update-activity/${a_id}`, updatedData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating student activity:", error);
    throw error;
  }
};

const convertBlobToBase64 = (bufferData) => {
  return new Promise((resolve) => {
    const base64String = btoa(
      new Uint8Array(bufferData).reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    resolve(base64String);
  });
};

export const fetchLatest20Events = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/student/latest", {
      withCredentials: true,
    });

    const events = await Promise.all(
      response.data.map(async (event) => {
        let imageBase64 = null;

        if (event.e_img?.data) {
          imageBase64 = await convertBlobToBase64(event.e_img.data);
        }

        return {
          ...event,
          e_img: imageBase64,
        };
      })
    );

    return events;
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return [];
  }
};


// Fetch single event by ID
export const fetchEventById = async (e_id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events/${e_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};

