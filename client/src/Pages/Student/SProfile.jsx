import React, { useEffect, useState, useRef } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import { fetchStudentInfo, fetchStudentActivityInfo } from "../../api/studentApi";
import Chart from "chart.js/auto"; // ✅ Import Chart.js
import './css/SProfile.css';
import profileImage from "../../assets/image.png";

const SProfile = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [activities, setActivities] = useState([]); // 🔹 State for activity info
  const chartRef = useRef(null); // ✅ Store chart instance

  useEffect(() => {
    const getStudentData = async () => {
      const data = await fetchStudentInfo();
      if (data) setStudentInfo(data);
    };

    const getStudentActivities = async () => {
      const activityData = await fetchStudentActivityInfo();
      if (activityData) setActivities(activityData);
    };

    getStudentData();
    getStudentActivities();
  }, []);

  useEffect(() => {
    if (!activities.length) return; // ✅ Prevent rendering if no activities

    const categoryPoints = {
      Technical: 0,
      Cultural: 0,
      Social: 0,
      Sports: 0,
      Internship: 0,
    };

    activities.forEach((activity) => {
      if (categoryPoints.hasOwnProperty(activity.a_type)) {
        categoryPoints[activity.a_type] += activity.a_points_scored || 0;
      }
    });

    const ctx = document.getElementById("pointsPieChart");

    if (ctx) {
      if (chartRef.current) {
        chartRef.current.destroy(); // ✅ Destroy previous chart before creating a new one
      }

      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: Object.keys(categoryPoints),
          datasets: [
            {
              data: Object.values(categoryPoints),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [activities]); // ✅ Recalculate only when `activities` change

  return (
    <div>
      <SNavbar />
      <div className="SProfile-main">
        <div className="Upper-SProfile">
          <div className="sprofile-details">
            <div className="sprofile-picture">
              <img src={profileImage} alt="Profile" className="profile-img" />
            </div>
            <div className="sprofile-info">
              {studentInfo ? (
                <table className="student-info-table">
                  <tbody>
                    <tr>
                      <td><strong>Name:</strong></td>
                      <td>{studentInfo.s_name}</td>
                    </tr>
                    <tr>
                      <td><strong>Batch:</strong></td>
                      <td>{studentInfo.s_batch}</td>
                    </tr>
                    <tr>
                      <td><strong>Semester:</strong></td>
                      <td>{studentInfo.s_sem}</td>
                    </tr>
                    <tr>
                      <td><strong>Section:</strong></td>
                      <td>{studentInfo.s_csec}</td>
                    </tr>
                    <tr>
                      <td><strong>Branch:</strong></td>
                      <td>{studentInfo.s_branch}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Loading student info...</p>
              )}
            </div>
          </div>
          {/* ✅ Pie Chart Added Here */}
          <div className="sprofile-pie-chart">
            <canvas id="pointsPieChart"></canvas> {/* ✅ Pie Chart Canvas */}
          </div>
        </div>

        {/* 🔹 Activity Table Section */}
        <div className="Lower-SProfile">
          <h2>Activity Details</h2>
          {activities.length > 0 ? (
            <table className="activity-table">
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
                  <th>Actions</th> {/* 🔹 Added Actions Column */}
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
                    <td>{activity.a_status}</td>
                    <td>{activity.a_points_scored !== null ? activity.a_points_scored : "Pending"}</td>
                    <td>
                      {/* 🔹 Placeholder for actions (edit/delete or future actions) */}
                      <button className="action-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No activities found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SProfile;
