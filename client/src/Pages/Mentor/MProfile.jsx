import React, { useEffect, useState } from "react";
import MNavbar from "../../Components/MentorC/MNavbar";
import { fetchMentorProfile } from "../../api/mentorApi";
import "./css/MProfile.css";

const MProfile = () => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchMentorProfile(); // 🔥 Fetch using session cookie
        setMentor(data);
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
      }
    };
    getProfile();
  }, []);

  return (
    <div>
      <MNavbar />
      <div className="mentor-profile container mt-5">
        <h3 className="text-center mb-4">Mentor Profile</h3>
        {mentor ? (
          <table className="table table-bordered profile-table">
            <tbody>
              <tr><th>Name</th><td>{mentor.m_name}</td></tr>
              <tr><th>Username</th><td>{mentor.m_username}</td></tr>
              <tr><th>Semester</th><td>{mentor.m_sem}</td></tr>
              <tr><th>Class Section</th><td>{mentor.m_csec}</td></tr>
              <tr><th>Branch</th><td>{mentor.m_branch}</td></tr>
              <tr><th>Total Students</th><td>{mentor.total_students}</td></tr>
            </tbody>
          </table>
        ) : (
          <p className="text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default MProfile;
