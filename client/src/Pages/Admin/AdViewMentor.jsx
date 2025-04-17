import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For redirection
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AdViewMentor.css";
import {
  getMentorsByBranch,
  deleteMentor,
  incrementSemester,
  updateMentorDetails,
} from "../../api/adminApi";

const AdViewMentor = () => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [mentorData, setMentorData] = useState([]);
  const [editMentorId, setEditMentorId] = useState(null);
  const [editedMentor, setEditedMentor] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];
  const semesters = Array.from({ length: 8 }, (_, i) => i + 1);
  const sections = ["A", "B"];
  const batches = ["1", "2", "3", "4"];

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

  const handleEditClick = (mentor) => {
    setEditMentorId(mentor.m_id);
    setEditedMentor({ ...mentor });
  };

  const handleInputChange = (field, value) => {
    setEditedMentor((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updated = await updateMentorDetails(editedMentor.m_id, editedMentor);
      setMentorData((prev) =>
        prev.map((mentor) =>
          mentor.m_id === editedMentor.m_id ? { ...mentor, ...editedMentor } : mentor
        )
      );
      setEditMentorId(null);
    } catch (error) {
      console.error("Error updating mentor:", error);
      alert("Failed to update mentor.");
    }
  };

  const handleCancel = () => {
    setEditMentorId(null);
    setEditedMentor({});
  };

  const handleDelete = async (m_id) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;

    try {
      await deleteMentor(m_id);
      setMentorData(mentorData.filter((mentor) => mentor.m_id !== m_id));
    } catch (error) {
      console.error("Error deleting mentor:", error);
      alert("Failed to delete mentor.");
    }
  };

  const handleIncrementSemester = async (m_id, currentSemester) => {
    if (currentSemester >= 8) {
      alert("❌ Semester cannot be more than 8.");
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

  // ✅ Navigate to mentor-wise insights
  const handleInsights = (m_id, m_name) => {
    navigate(`/admin/mentor-insights/${m_id}`, {
      state: { mentorName: m_name },
    });
  };

  return (
    <div>
      <AdNavbar />
      <div className="mentor-view-main">
        <h5 className="mentor-view-main-htext">Select branch to view respective mentor details:</h5>

        <div className="branch-dropdown">
          <select
            className="form-control"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>{branch}</option>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mentorData.map((mentor) => (
                  <tr key={mentor.m_id}>
                    <td>
                      {editMentorId === mentor.m_id ? (
                        <input
                          className="form-control"
                          value={editedMentor.m_name}
                          onChange={(e) => handleInputChange("m_name", e.target.value)}
                        />
                      ) : (
                        mentor.m_name
                      )}
                    </td>
                    <td>
                      {editMentorId === mentor.m_id ? (
                        <select
                          className="form-control"
                          value={editedMentor.m_batch}
                          onChange={(e) => handleInputChange("m_batch", e.target.value)}
                        >
                          {batches.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      ) : (
                        mentor.m_batch
                      )}
                    </td>
                    <td>
                      {editMentorId === mentor.m_id ? (
                        <select
                          className="form-control"
                          value={editedMentor.m_sem}
                          onChange={(e) => handleInputChange("m_sem", e.target.value)}
                        >
                          {semesters.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        mentor.m_sem
                      )}
                    </td>
                    <td>
                      {editMentorId === mentor.m_id ? (
                        <select
                          className="form-control"
                          value={editedMentor.m_csec}
                          onChange={(e) => handleInputChange("m_csec", e.target.value)}
                        >
                          {sections.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        mentor.m_csec
                      )}
                    </td>
                    <td>
                      {editMentorId === mentor.m_id ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
                            Save
                          </button>
                          <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => handleIncrementSemester(mentor.m_id, mentor.m_sem)}
                          >
                            <i className="bi bi-arrow-up-square-fill"></i>
                          </button>
                          <button
                            className="btn btn-info btn-sm me-2"
                            title="Edit"
                            onClick={() => handleEditClick(mentor)}
                          >
                            <i className="bi bi-pen"></i>
                          </button>
                          <button
                            className="btn btn-dark btn-sm me-2"
                            title="Mentor Insights"
                            onClick={() => handleInsights(mentor.m_id, mentor.m_name)}
                          >
                            <i className="bi bi-lightbulb"></i>
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(mentor.m_id)}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </>
                      )}
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
