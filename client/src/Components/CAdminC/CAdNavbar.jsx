import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './css/CAdNavbar.css';

console.log("✅ AdNavbar component is being rendered.");

const CAdNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("🛑 Logging out...");
      const response = await fetch("http://localhost:5000/api/session/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      console.log("✅ Logout response:", data);

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

  console.log("✅ Navbar JSX is being returned.");

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="admin-role-button">
          <button>Club Admin</button>
        </div>
        <div className="container-fluid">
          {console.log("✅ Navbar container \\\\\\ being rendered.")}

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
              <div className="links-adnav">
                <NavLink className="nav-link" to="/cHomepage">Home</NavLink>
                <NavLink className="nav-link" to="/cadd-events">Add Events</NavLink>
                <NavLink className="nav-link" to="/cadmin-calendar">View Calendar</NavLink>
              </div>
              <div className="logout profile">
                <a href="/cprofile">
                  <i className="bi bi-person-circle cadmin-profile-icon fs-4"></i>
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

export default CAdNavbar;
