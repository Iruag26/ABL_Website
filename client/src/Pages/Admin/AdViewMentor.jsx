import React, { useState, useEffect } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AdViewMentor.css";
import { getMentorsByBranch } from "../../api/adminApi"; // ✅ API for fetching mentors
import { deleteMentor, incrementSemester } from "../../api/adminApi"; // ✅ API for delete & increment

const AdViewMentor = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [mentorData, setMentorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];

  // Fetch mentors based on selected branch
  useEffect(() => {
    const fetchMentors = async () => {
      if (!selectedBranch) return;

      setLoading(true);
      setError("");

      try {
        const data = await getMentorsByBranch(selectedBranch);
        setMentorData(data);
      } catch (err) {
        console.error("Error fetching mentors:", err);
        setError("Failed to fetch mentors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [selectedBranch]);

  // ✅ Delete Mentor Handler
  const handleDelete = async (m_id) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;

    try {
      await deleteMentor(m_id);
      setMentorData(mentorData.filter((mentor) => mentor.m_id !== m_id)); // Remove from state
    } catch (error) {
      console.error("Error deleting mentor:", error);
      alert("Failed to delete mentor.");
    }
  };

  // ✅ Increment Semester Handler
  const handleIncrementSemester = async (m_id, currentSemester) => {
    if (currentSemester >= 8) {
      alert("Mentor is already at the maximum semester.");
      return;
    }

    try {
      const updatedMentor = await incrementSemester(m_id);
      setMentorData(
        mentorData.map((mentor) =>
          mentor.m_id === m_id ? { ...mentor, m_sem: updatedMentor.m_sem } : mentor
        )
      );
    } catch (error) {
      console.error("Error incrementing semester:", error);
      alert("Failed to increment semester.");
    }
  };

  return (
    <div>
      <AdNavbar />
      <div className="mentor-view-main">
        <h5 className="mentor-view-main-htext">
          Select branch to view respective mentor details:
        </h5>
        <div className="branch-dropdown">
          <select
            className="form-control"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div className="mentor-info-table">
          {loading ? (
            <p>Loading mentors...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : mentorData.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Batch</th>
                  <th>Semester</th>
                  <th>Class Section</th>
                  <th>Actions</th> {/* 🔹 Added Actions Column */}
                </tr>
              </thead>
              <tbody>
                {mentorData.map((mentor, index) => (
                  <tr key={index}>
                    <td>{mentor.m_name}</td>
                    <td>{mentor.m_batch}</td>
                    <td>{mentor.m_sem}</td>
                    <td>{mentor.m_csec}</td>
                    <td>
                      {/* 🔹 Increment Semester Button */}
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleIncrementSemester(mentor.m_id, mentor.m_sem)}
                      >
                        <i className="bi bi-arrow-up-square-fill"></i>
                      </button>

                      {/* 🔹 Delete Mentor Button */}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(mentor.m_id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : selectedBranch ? (
            <p>No mentors found for {selectedBranch}</p>
          ) : (
            <p>Select a branch to view mentor details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdViewMentor;
