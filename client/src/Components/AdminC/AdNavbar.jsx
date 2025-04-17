import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ use NavLink instead of <a>
import './css/AdNavbar.css';

console.log("✅ AdNavbar component is being rendered.");

const AdNavbar = () => {
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
          <button>Admin</button>
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
                <NavLink className="nav-link" to="/aHomepage">Home</NavLink>
                <NavLink className="nav-link" to="/add-events">Add Events</NavLink>
                <NavLink className="nav-link" to="/add-mentor">Add Mentor</NavLink>
                <NavLink className="nav-link" to="/ad-view-mentor">View Mentor</NavLink>
                <NavLink className="nav-link" to="/ad-view-students">View Students</NavLink>
              </div>
              <div className="logout profile">
                <a href="/adprofile">
                  <i className="bi bi-person-circle admin-profile-icon fs-4"></i>
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

export default AdNavbar;
