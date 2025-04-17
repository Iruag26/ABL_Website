import React, { useEffect, useState, useRef } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import {
  fetchStudentInfo,
  fetchStudentActivityInfo,
  updateStudentActivity,
} from "../../api/studentApi";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./css/SProfile.css";
import profileImage from "../../assets/image.png";

Chart.register(ChartDataLabels);

const SProfile = () => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [totalPoints, setTotalPoints] = useState(0);
  const chartRef = useRef(null);

  const [filters, setFilters] = useState({
    a_type: "",
    a_status: "",
    a_level: "",
    a_start_date: "",
  });

  useEffect(() => {
    const getStudentData = async () => {
      const data = await fetchStudentInfo();
      if (data) setStudentInfo(data);
    };

    const getStudentActivities = async () => {
      const data = await fetchStudentActivityInfo();
      if (data) {
        setActivities(data);
        setFilteredActivities(data);
      }
    };

    getStudentData();
    getStudentActivities();
  }, []);

  useEffect(() => {
    if (!activities.length) return;

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

    setTotalPoints(Object.values(categoryPoints).reduce((a, b) => a + b, 0));

    const ctx = document.getElementById("pointsPieChart");
    if (ctx) {
      if (chartRef.current) chartRef.current.destroy();
      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: Object.keys(categoryPoints),
          datasets: [
            {
              data: Object.values(categoryPoints),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              display: (context) => {
                const value = context.dataset.data[context.dataIndex];
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = (value / total) * 100;
                return percentage > 5; // only show if > 5%
              },
              formatter: (value, context) => {
                const total = context.chart.data.datasets[0].data.reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
              },
              color: "#fff",
              font: {
                weight: "bold",
                size: 14,
              },
            },
          },
        },
      });
    }
  }, [activities]);

  useEffect(() => {
    const filtered = activities.filter((activity) => {
      return (
        (filters.a_type ? activity.a_type === filters.a_type : true) &&
        (filters.a_status ? activity.a_status === filters.a_status : true) &&
        (filters.a_level ? activity.a_level === filters.a_level : true) &&
        (filters.a_start_date
          ? activity.a_start_date?.slice(0, 10) === filters.a_start_date
          : true)
      );
    });
    setFilteredActivities(filtered);
  }, [filters, activities]);

  const handleEdit = (activity) => {
    if (activity.a_status === "Approved") {
      alert("This activity is approved and cannot be edited.");
      return;
    }
    setEditRowId(activity.a_id);
    setEditedData({ ...activity });
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (a_id) => {
    try {
      await updateStudentActivity(a_id, editedData);
      const updatedList = activities.map((act) =>
        act.a_id === a_id ? { ...act, ...editedData } : act
      );
      setActivities(updatedList);
      setEditRowId(null);
      setEditedData({});
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditedData({});
  };

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
                      <td>
                        <strong>Name:</strong>
                      </td>
                      <td>{studentInfo.s_name}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Roll No:</strong>
                      </td>
                      <td>{studentInfo.s_username}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Batch:</strong>
                      </td>
                      <td>{studentInfo.s_batch}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Semester:</strong>
                      </td>
                      <td>{studentInfo.s_sem}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Division:</strong>
                      </td>
                      <td>{studentInfo.s_csec}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Branch:</strong>
                      </td>
                      <td>{studentInfo.s_branch}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Loading student info...</p>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: "1cm", alignItems: "center" }}>
            <div className="sprofile-pie-chart">
              <canvas id="pointsPieChart"></canvas>
            </div>
            <div className="points-circle-section">
              <div className="points-circle">{totalPoints}/100</div>
              <div className="tpe-text">Total Points Earned</div>
            </div>
          </div>
        </div>
        <div className="Lower-SProfile">
          <h2>Activity Details</h2>

          {/* Filters */}
          <div className="filters d-flex flex-wrap gap-4 mb-3">
            <div className="filter-elements">
              <label>
                <strong>Activity Type: </strong>
              </label>
              <select
                value={filters.a_type}
                onChange={(e) =>
                  setFilters({ ...filters, a_type: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="Technical">Technical</option>
                <option value="Cultural">Cultural</option>
                <option value="Social">Social</option>
                <option value="Sports">Sports</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="filter-elements">
              <label>
                <strong>Status: </strong>
              </label>
              <select
                value={filters.a_status}
                onChange={(e) =>
                  setFilters({ ...filters, a_status: e.target.value })
                }
              >
                <option value="">All Status: </option>
                <option value="Approved">Approved</option>
                <option value="Not Approved">Not Approved</option>
              </select>
            </div>

            <div className="filter-elements">
              <label>
                <strong>Activity Level: </strong>
              </label>
              <select
                value={filters.a_level}
                onChange={(e) =>
                  setFilters({ ...filters, a_level: e.target.value })
                }
              >
                <option value="">All Levels</option>
                <option value="Intra-Collegiate">Intra-Collegiate</option>
                <option value="Inter-Collegiate(University-Level)">
                  Inter-Collegiate(University-Level)
                </option>
                <option value="State Level">State Level</option>
                <option value="National Level">National Level</option>
                <option value="International Level">International Level</option>
              </select>
            </div>

            <div className="filter-elements">
              <label>
                <strong>Start Date: </strong>
              </label>
              <input
                type="date"
                value={filters.a_start_date}
                onChange={(e) =>
                  setFilters({ ...filters, a_start_date: e.target.value })
                }
              />
            </div>

            <div className="filter-elements">
              <label>
                <strong>End Date: </strong>
              </label>
              <input
                type="date"
                value={filters.a_end_date || ""}
                onChange={(e) =>
                  setFilters({ ...filters, a_end_date: e.target.value })
                }
              />
            </div>
          </div>

          {filteredActivities.length > 0 ? (
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
                  <th>Points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity) => (
                  <tr key={activity.a_id}>
                    <td>
                      {editRowId === activity.a_id ? (
                        <input
                          value={editedData.a_name}
                          onChange={(e) =>
                            handleChange("a_name", e.target.value)
                          }
                        />
                      ) : (
                        activity.a_name
                      )}
                    </td>

                    <td>
                      {editRowId === activity.a_id ? (
                        <select
                          className="form-select"
                          value={editedData.a_type}
                          onChange={(e) =>
                            handleChange("a_type", e.target.value)
                          }
                        >
                          <option value="Technical">Technical</option>
                          <option value="Cultural">Cultural</option>
                          <option value="Social">Social</option>
                          <option value="Sports">Sports</option>
                          <option value="Internship">Internship</option>
                        </select>
                      ) : (
                        activity.a_type
                      )}
                    </td>

                    <td>
                      {editRowId === activity.a_id ? (
                        <input
                          value={editedData.a_sub_type}
                          onChange={(e) =>
                            handleChange("a_sub_type", e.target.value)
                          }
                        />
                      ) : (
                        activity.a_sub_type
                      )}
                    </td>

                    <td>
                      {editRowId === activity.a_id ? (
                        <input
                          type="date"
                          value={editedData.a_start_date?.slice(0, 10) || ""}
                          onChange={(e) =>
                            handleChange("a_start_date", e.target.value)
                          }
                        />
                      ) : (
                        activity.a_start_date?.slice(0, 10)
                      )}
                    </td>

                    <td>
                      {editRowId === activity.a_id ? (
                        <input
                          type="date"
                          value={editedData.a_end_date?.slice(0, 10) || ""}
                          onChange={(e) =>
                            handleChange("a_end_date", e.target.value)
                          }
                        />
                      ) : (
                        activity.a_end_date?.slice(0, 10)
                      )}
                    </td>

                    <td>
                      {editRowId === activity.a_id ? (
                        <input
                          value={editedData.a_venue}
                          onChange={(e) =>
                            handleChange("a_venue", e.target.value)
                          }
                        />
                      ) : (
                        activity.a_venue
                      )}
                    </td>

                    <td>
                      {editRowId === activity.a_id ? (
                        <select
                          className="form-select"
                          value={editedData.a_level}
                          onChange={(e) =>
                            handleChange("a_level", e.target.value)
                          }
                        >
                          <option value="Intra-Collegiate">
                            Intra-Collegiate
                          </option>
                          <option value="Inter-Collegiate(University-Level)">
                            Inter-Collegiate(University-Level)
                          </option>
                          <option value="State Level">State Level</option>
                          <option value="National Level">National Level</option>
                          <option value="International Level">
                            International Level
                          </option>
                        </select>
                      ) : (
                        activity.a_level
                      )}
                    </td>

                    <td>{activity.a_status}</td>
                    <td>
                      {activity.a_points_scored !== null
                        ? activity.a_points_scored
                        : "Pending"}
                    </td>
                    <td className="action-icons">
                      {editRowId === activity.a_id ? (
                        <>
                          <button
                            className="btn btn-sm btn-success me-1"
                            onClick={() => handleSave(activity.a_id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            title="Edit"
                            onClick={() => handleEdit(activity)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                        </>
                      )}
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
