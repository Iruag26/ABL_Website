import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudentCredentials, getClubAdminStatus,  checkSession } from "../api/studentApi";
import { fetchAdminCredentials } from "../api/adminApi";
import { fetchMentorCredentials } from "../api/mentorApi";

import "./css/LoginForm.css";


const LoginForm = ({ role }) => {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate(); // For navigation on success


  useEffect(() => {
    const verifySession = async () => {
      const session = await checkSession();
      if (session) {
        navigate(`/${session.role.toLowerCase()}Homepage`);
      }
    };
    verifySession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      if (role === "Student" || role === "Club Admin") {
        console.log("Initiating API call with username:", username);
        // Fetch student credentials
        const credentials = await fetchStudentCredentials(username);
        console.log("API Response:", credentials);
        var flag = 1;

        if (role === "Club Admin") {
          const clubadstatus = await getClubAdminStatus(credentials.s_id);
          if (!clubadstatus) {
            flag = 0;
            setError("Student is not a Club Admin");
          }
        }
        // Verify password
        if (credentials.s_password === password && flag === 1) {
          console.log(
            "Password match! Redirecting to the appropriate homepage."
          );
          if (role === "Club Admin") {
            navigate("/cHomepage");
          } else if (role === "Student") {
            navigate("/sHomepage");
          }
        } else {
          console.warn("Invalid password provided.");
          setError("Invalid password.");
        }
      } else if (role === "Admin") {
        console.log("Initiating API call with username:", username);
        // Fetch admin credentials
        const credentials = await fetchAdminCredentials(username);
        console.log("API Response:", credentials);
        if (credentials.a_password === password) {
          console.log(
            "Password match! Redirecting to the appropriate homepage."
          );
          navigate("/aHomepage");
        }
      } else if (role === "mentor") {

        console.log("Initiating API call with username:", username);
        // Fetch mentor credentials
        const credentials = await fetchMentorCredentials(username);
        console.log("API Response:", credentials);
        if (credentials.m_password === password) {
          console.log(
            "Password match! Redirecting to the appropriate homepage."
          );
          navigate("/mHomepage");
        }

      }
      else {
        console.log("Role doesn't exist");
      }
    } catch (err) {
      setError("Invalid username or server error.");
      console.error("Error during login:", err);

      // Detailed error logging
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Unexpected error:", err.message);
      }
    }
  };

  return (
    <div className="loginform">
      <div className="logintext">Login  {role ? `- ${role}` : ""}</div>
      <form onSubmit={handleLogin}>
        <div className="mb-3 username">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state
            required
          />
        </div>
        <div className="mb-3 password">
          <label htmlFor="inputPassword6" className="col-form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword6"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state
            required
          />
        </div>
        <input className="btn btn-success" type="submit" value="Submit" />
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
