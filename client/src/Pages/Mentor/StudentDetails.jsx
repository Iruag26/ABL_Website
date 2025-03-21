import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FetchStudentActivities, AssignActivityPoints } from "../../api/mentorApi";
import MNavbar from "../../Components/MentorC/MNavbar";
import "./css/StudentDetails.css";

const StudentDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const studentName = location.state?.studentName || "Unknown Student";

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        console.error("Error: Missing student ID in URL");
        return;
      }

      const data = await FetchStudentActivities(id);
      if (data) {
        setActivities(data);
      }
    };

    fetchDetails();
  }, [id]);

  // ✅ Handle Approve Action
  const handleApprove = async (a_id, a_type, a_sub_type, a_level) => {
    console.log(`🛑 Approving Activity ID: ${a_id}, Type: ${a_type}, Sub Type: ${a_sub_type}, Level: ${a_level}`);

    const response = await AssignActivityPoints(a_id, a_type, a_sub_type, a_level);
    if (response) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.a_id === a_id ? { ...activity, a_status: "Approved" } : activity
        )
      );
    }
  };


  if (activities.length === 0) {
    return <p className="loading-text">No activities found for {studentName}.</p>;
  }

  return (
    <div>
      <MNavbar />
      <div className="student-details-container">
        <h2>{studentName}'s Activities</h2>
        <table className="details-table">
          <thead>
            <tr>
              <th>Activity Name</th>
              <th>Type</th>
              <th>Sub Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Venue</th>
              <th>Level</th>
              <th>Status</th>
              <th>Points Scored</th>
              <th>Actions</th> {/* 🔹 Actions Column */}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.a_id}>
                <td>{activity.a_name}</td>
                <td>{activity.a_type}</td>
                <td>{activity.a_sub_type}</td>
                <td>{activity.a_start_date || "N/A"}</td>
                <td>{activity.a_end_date || "N/A"}</td>
                <td>{activity.a_venue || "N/A"}</td>
                <td>{activity.a_level || "N/A"}</td>
                <td>{activity.a_status}</td> {/* Status Column */}
                <td>{activity.a_points_scored !== null ? activity.a_points_scored : "Pending"}</td>
                <td>
                  {activity.a_status !== "Approved" && (
                    <button
                      className="action-btn approve-btn"
                      onClick={() => handleApprove(activity.a_id, activity.a_type, activity.a_sub_type, activity.a_level)}
                    >
                      <i className="bi bi-check-square"></i>
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentDetails;
