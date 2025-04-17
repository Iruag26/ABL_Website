import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchMentorInsights } from "../../api/adminApi";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import './css/AdMentorInsights.css';

const AdMentorInsights = () => {
  const { mentorId } = useParams();
  const { state } = useLocation();
  const mentorName = state?.mentorName || "Unknown";

  const [mentorInfo, setMentorInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMentorInsights(mentorId);
        setMentorInfo(data);
      } catch (error) {
        console.error("Error loading mentor insights:", error);
      }
    };

    fetchData();
  }, [mentorId]);

  return (
    <div>
      <AdNavbar />
      <div className="ad-mentor-insights-wrapper container mt-5">
        <h3 className="text-center">Mentor Overview</h3>
        {mentorInfo ? (
          <>
            <table className="mentor-info-table-ad table table-bordered mt-4">
              <tbody>
                <tr><th>Name</th><td>{mentorInfo.m_name}</td></tr>
                <tr><th>Batch</th><td>{mentorInfo.m_batch}</td></tr>
                <tr><th>Semester</th><td>{mentorInfo.m_sem}</td></tr>
                <tr><th>Class Section</th><td>{mentorInfo.m_csec}</td></tr>
                <tr><th>Branch</th><td>{mentorInfo.m_branch}</td></tr>
                <tr><th>Total Students</th><td>{mentorInfo.total_students}</td></tr>
              </tbody>
            </table>

            <div className="mentor-activity-chart mt-5">
              <h5 className="text-center mb-3">Total Points by Activity Type</h5>
              <Bar
                data={{
                  labels: ["Technical", "Cultural", "Sports", "Social", "Internship"],
                  datasets: [
                    {
                      label: "Total Points (Batch)",
                      data: [
                        mentorInfo.activityPoints.Technical,
                        mentorInfo.activityPoints.Cultural,
                        mentorInfo.activityPoints.Sports,
                        mentorInfo.activityPoints.Social,
                        mentorInfo.activityPoints.Internship
                      ],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",     // Technical - Red
                        "rgba(54, 162, 235, 0.6)",     // Cultural - Blue
                        "rgba(255, 206, 86, 0.6)",     // Sports - Yellow
                        "rgba(75, 192, 192, 0.6)",     // Social - Teal
                        "rgba(153, 102, 255, 0.6)"     // Internship - Purple
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)"
                      ],
                      borderWidth: 1
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Points"
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Activity Type"
                      }
                    }
                  }
                }}
              />
            </div>
          </>
        ) : (
          <p className="text-center mt-4">Loading mentor details...</p>
        )}
      </div>
    </div>
  );
};

export default AdMentorInsights;
