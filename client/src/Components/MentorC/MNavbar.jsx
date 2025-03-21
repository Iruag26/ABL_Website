import React from "react";
import { useNavigate } from "react-router-dom";
import './css/MNavbar.css';
import { FetchStudentList } from "../../api/mentorApi";

const MNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Logout successful:", data);
        navigate("/");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleViewStudents = async (event) => {
    event.preventDefault(); // Prevent default link behavior

    const students = await FetchStudentList();
    if (students) {
      navigate("/view-students"); // Navigate only if fetch is successful
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="mentor-role-button">
          <button>
            mentor
          </button>
        </div>
        <div className="container-fluid">
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

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup-m">
            <div className="navbar-mmnav">
              <div className="links-mnav">
                <a className="nav-link" href="/mHomepage">
                  Home
                </a>
                <a className="nav-link" href="/view-students" onClick={handleViewStudents}>
                  View Students
                </a>
              </div>
              <div className="logout profile">
                <a href="/mprofile">
                  <i className="bi bi-person-circle mentor-profile-icon fs-4"></i>
                </a>
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

export default MNavbar;
