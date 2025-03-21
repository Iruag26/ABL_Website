import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStudentCredentials, getClubAdminStatus } from "../api/studentApi";
import { fetchAdminCredentials } from "../api/adminApi";
import { fetchMentorCredentials } from "../api/mentorApi";

import "./css/LoginForm.css";

const LoginForm = ({ role }) => {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 

        try {
            let credentials;
            let isValid = false;

            if (role === "Student" || role === "Club Admin") {
                credentials = await fetchStudentCredentials(username);
                
                if (role === "Club Admin") {
                    const clubAdminStatus = await getClubAdminStatus(credentials.s_id);
                    if (!clubAdminStatus) {
                        setError("Student is not a Club Admin");
                        return;
                    }
                }

                isValid = credentials.s_password === password;
            } 
            else if (role === "Admin") {
                credentials = await fetchAdminCredentials(username);
                isValid = credentials.a_password === password;
            } 
            else if (role === "Mentor") {
                credentials = await fetchMentorCredentials(username);
                isValid = credentials.m_password === password;
            } 
            else {
                setError("Invalid role.");
                return;
            }

            if (!isValid) {
                setError("Invalid username or password.");
                return;
            }

            // 🔹 Step 1: Send request to backend to create a session
            const sessionResponse = await fetch("http://localhost:5000/api/session/generate-token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // 🔥 Ensures session cookie is stored
                body: JSON.stringify({
                    username: username,  
                    user_type: role.toLowerCase() // Convert role to lowercase for consistency
                }),
            });

            const sessionData = await sessionResponse.json();

            if (sessionResponse.ok) {
                console.log("Session created successfully:", sessionData);

                // 🔹 Step 2: Redirect based on role
                if (role === "Club Admin") navigate("/cHomepage");
                else if (role === "Student") navigate("/sHomepage");
                else if (role === "Admin") navigate("/aHomepage");
                else if (role === "Mentor") navigate("/mHomepage");
            } else {
                setError(sessionData.message || "Failed to create session.");
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError("Server error. Please try again.");
        }
    };

    return (
        <div className="loginform">
            <div className="logintext" style={{ color: "black"}}>Login {role ? `- ${role}` : ""}</div>
            <form onSubmit={handleLogin}>
                <div className="mb-3 username">
                    <label htmlFor="usernameInput" className="form-label" style={{ color: "black"}}>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="usernameInput"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>   
                <div className="mb-3 password">
                    <label htmlFor="passwordInput" className="col-form-label" style={{ color: "black"}}>Password</label>
                    <input
                        type="password"
                        id="passwordInput"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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