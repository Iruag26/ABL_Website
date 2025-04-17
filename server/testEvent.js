import axios from "axios";

const URL = "http://localhost:5000/api/admin/activities/19";

const testStudentReport = async () => {
  try {
    const res = await axios.get(URL, {
      withCredentials: true, // ⬅️ only if using sessions/cookies
    });

    console.log("✅ Success! Response from /api/admin/activities/19:");
    console.log(JSON.stringify(res.data, null, 2)); // pretty print
  } catch (err) {
    console.error("❌ Error during /api/admin/activities/19 test:");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    } else {
      console.error(err.message);
    }
  }
};

testStudentReport();
