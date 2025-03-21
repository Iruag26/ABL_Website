import React from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AdProfile.css"; // Import the CSS file
import image from "../../assets/image.png"

const AdProfile = () => {
  // Dummy admin details (Replace with API data if needed)
  const adminData = {
    name: "Admin Name",
    username: "admin1",
    email: "admin@example.com",
    role: "System Administrator",
  };

  return (
    <div>
      <AdNavbar />
      <div className="admin-profile-container">
        <div className="admin-profile-card">
          <div className="admin-profile-image">
            <img src= {image} alt="Admin Avatar" />
          </div>
          <div className="admin-profile-details">
            <h2>{adminData.name}</h2>
            <p><strong>Username:</strong> {adminData.username}</p>
            <p><strong>Email:</strong> {adminData.email}</p>
            <p><strong>Role:</strong> {adminData.role}</p>
            <button className="edit-profile-btn">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdProfile;
