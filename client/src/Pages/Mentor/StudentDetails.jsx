import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  FetchStudentActivities,
  AssignActivityPoints,
  DeleteActivity,
} from "../../api/mentorApi";
import MNavbar from "../../Components/MentorC/MNavbar";
import "./css/StudentDetails.css";

const StudentDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const studentName = location.state?.studentName || "Unknown Student";

  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({
    a_type: "",
    a_status: "",
    a_level: "",
  });

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

  const handleApprove = async (a_id, a_type, a_sub_type, a_level) => {
    const confirm = window.confirm("Do you want to approve this event?");
    if (!confirm) return;

    const response = await AssignActivityPoints(
      a_id,
      a_type,
      a_sub_type,
      a_level
    );
    if (response) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.a_id === a_id
            ? {
                ...activity,
                a_status: "Approved",
                a_points_scored: response.points,
              }
            : activity
        )
      );
    }
  };

  const handleDelete = async (a_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );
    if (!confirmDelete) return;

    const success = await DeleteActivity(a_id);
    if (success) {
      setActivities((prev) =>
        prev.filter((activity) => activity.a_id !== a_id)
      );
    }
  };

  const handleSendBack = (a_id) => {
    alert(`Send back request triggered for Activity ID: ${a_id}`);
    // implement your logic here
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredActivities = activities.filter((activity) => {
    const { a_type, a_status, a_level } = activity;

    return (
      (!filters.a_type || a_type === filters.a_type) &&
      (!filters.a_status || a_status === filters.a_status) &&
      (!filters.a_level || a_level === filters.a_level)
    );
  });

  if (activities.length === 0) {
    return (
      <p className="loading-text">No activities found for {studentName}.</p>
    );
  }

  return (
    <div>
      <MNavbar />
      <div className="student-details-container">
        <h2>{studentName}'s Activities</h2>

        {/* Filters */}
        <div className="mentor-filters row mb-4 g-3">
          <div className="col-md-3">
            <select
              name="a_type"
              value={filters.a_type}
              onChange={handleFilterChange}
              className="mentor-filter-type"
            >
              <option value="">All Types</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Social">Social</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              name="a_status"
              value={filters.a_status}
              onChange={handleFilterChange}
              className="mentor-filter-status"
            >
              <option value="">All Statuses</option>
              <option value="Not Approved">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              name="a_level"
              value={filters.a_level}
              onChange={handleFilterChange}
              className="mentor-filter-level"
            >
              <option value="">All Levels</option>
              <option value="Intra-Collegiate">Intra-College</option>
              <option value="Inter-Collegiate(University-Level)">University</option>
              <option value="State Level">State</option>
              <option value="National Level">National</option>
              <option value="International-Level">International</option>
            </select>
          </div>
        </div>

        {/* Table */}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity) => (
              <tr key={activity.a_id}>
                <td>{activity.a_name}</td>
                <td>{activity.a_type}</td>
                <td>{activity.a_sub_type}</td>
                <td>{activity.a_start_date || ""}</td>
                <td>{activity.a_end_date || ""}</td>
                <td>{activity.a_venue || ""}</td>
                <td>{activity.a_level || ""}</td>
                <td>{activity.a_status}</td>
                <td>
                  {activity.a_points_scored !== null
                    ? activity.a_points_scored
                    : "Pending"}
                </td>
                <td>
                  {activity.a_status !== "Approved" && (
                    <>
                      <button
                        className="action-btn approve-btn me-2"
                        onClick={() =>
                          handleApprove(
                            activity.a_id,
                            activity.a_type,
                            activity.a_sub_type,
                            activity.a_level
                          )
                        }
                        title="Approve"
                      >
                        <i className="bi bi-check-square"></i>
                      </button>
                      <button
                        className="action-btn sendback-btn me-2"
                        onClick={() => handleSendBack(activity.a_id)}
                        title="Send Back"
                      >
                        <i className="bi bi-arrow-counterclockwise"></i>
                      </button>
                    </>
                  )}
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(activity.a_id)}
                    title="Delete"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
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
