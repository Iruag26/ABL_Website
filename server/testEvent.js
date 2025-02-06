import axios from "axios";
import FormData from "form-data"; // Use the 'form-data' package
import fs from "fs"; // For reading the image file

// const testAddMentor = async () => {
//   const url = "http://localhost:5000/add-mentor";

//   const testData = {
//     m_username: "testmentor",
//     m_password: "securepassword",
//     m_name: "Test Mentor",
//     m_batch: "3",
//     m_sem: "5",
//     m_csec: "A",
//     m_branch: "CSE",
//   };

//   try {
//     const response = await axios.post(url, testData);
//     console.log("Response from server:", response.data);
//   } catch (error) {
//     console.error("Error testing backend:", error.response?.data || error.message);
//   }
// };

// // Run the test
// testAddMentor();

