import React from "react";
import { useNavigate } from "react-router-dom";
import './css/SNavbar.css';

// ✅ Step 1: Check if SNavbar is being imported & rendered
console.log("✅ SNavbar component is being rendered.");

const SNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("🛑 Logging out..."); // ✅ Step 2: Check if Logout Function 
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are cleared
      });

      const data = await response.json();
      console.log("✅ Logout response:", data); // ✅ Step 3: Check Response

      if (response.ok) {
        console.log("✅ Logout successful. Navigating to /");
        navigate("/");
      } else {
        console.error("❌ Logout failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Error during logout:", error);
    }
  };

  console.log("✅ Navbar JSX is being returned."); // ✅ Step 4: Check if JSX is being returned

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="student-role-button">
          <button>
            student
          </button>
        </div>
        <div className="container-fluid">
          {/* ✅ Step 5: Check if Navbar Container Renders */}
          {console.log("✅ Navbar container \\\\\\ being rendered.")}

          {/* Navbar Toggler for Collapse */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup-s">
            <div className="navbar-nav">
              <div className="links-snav">
                <a className="nav-link" href="/sHomepage">Home</a>
                <a className="nav-link" href="/student-calendar">Calendar</a>
                <a className="nav-link" href="/make-entry">Enter Records(Activity)</a>
              </div>
              <div className="logout profile">
                <a href="/profile">
                  <i className="bi bi-person-circle student-profile-icon fs-4"></i>
                </a>
                {/* 🔹 Logout Button */}
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right fs-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SNavbar;
