import React, { useEffect, useState } from "react";
import { fetchClubAdminProfile } from "../../api/cadminApi";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";
import "./css/CProfile.css";

const CProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchClubAdminProfile();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    getProfile();
  }, []);

  if (!profile) {
    return (
      <div>
        <CAdNavbar />
        <div className="loading-cprofile text-center">
          <h4>Loading profile...</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CAdNavbar />
      <div className="club-admin-profile d-flex justify-content-center align-items-center">
        <div className="profile-card shadow">
          <div className="profile-pic-placeholder mb-3"></div>
          <h4 className="text-center mb-3">{profile.club_name} - Admin</h4>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Roll No:</strong> {profile.rollno}</p>
          <p><strong>Class:</strong> Sem {profile.sem} - Section {profile.section}</p>
          <p><strong>Branch:</strong> {profile.branch}</p>
          <p><strong>Batch:</strong> {profile.batch}</p>
        </div>
      </div>
    </div>
  );
};

export default CProfile;
