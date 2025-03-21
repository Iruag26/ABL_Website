import React, { useState } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AdViewStudents.css";
import { fetchStudentsByFilters } from "../../api/adminApi";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Ensure Chart.js is imported

const AdViewStudents = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sections = ["A", "B"];
  const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  // ✅ Handler for Fetching Students
  const fetchStudents = async () => {
    if (!selectedSection || !selectedBranch || !selectedSemester) {
      alert("Please select all fields before fetching students.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchStudentsByFilters(selectedSection, selectedBranch, selectedSemester);
      setStudents(data);
    } catch (err) {
      setError("Failed to fetch students. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AdNavbar />
      <div className="adview-students-main">
        <h5>Select Section, Branch & Semester to View Students</h5>

        {/* 🔹 Dropdowns for Filtering Students */}
        <div className="dropdown-container">
          <select className="form-control" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="">Select Section</option>
            {sections.map((sec, index) => (
              <option key={index} value={sec}>{sec}</option>
            ))}
          </select>

          <select className="form-control" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>{branch}</option>
            ))}
          </select>

          <select className="form-control" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
            <option value="">Select Semester</option>
            {semesters.map((sem, index) => (
              <option key={index} value={sem}>{sem}</option>
            ))}
          </select>

          <button className="btn btn-outline-primary" onClick={fetchStudents}>Fetch Students</button>
        </div>
        <div className="adview-students-barplot">
          {students.length > 0 ? (
            <Bar
              data={{
                labels: students.map((student) => student.s_name), // Student names on x-axis
                datasets: [
                  {
                    label: "Total Activity Points",
                    data: students.map((student) => student.total_points), // Total points on y-axis
                    backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color bars
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: "Total Points" },
                  },
                  x: {
                    title: { display: true, text: "Students" },
                  },
                },
              }}
            />
          ) : (
            <p>No data available for the selected criteria.</p>
          )}
        </div>;

        {/* 🔹 Display Students Table */}
        <div className="students-table">
          {loading ? <p>Loading students...</p> : error ? <p className="text-danger">{error}</p> : students.length > 0 ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Batch</th>
                  <th>Semester</th>
                  <th>Section</th>
                  <th>Branch</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td>{student.s_name}</td>
                    <td>{student.s_batch}</td>
                    <td>{student.s_sem}</td>
                    <td>{student.s_csec}</td>
                    <td>{student.s_branch}</td>
                    <td>{student.total_points}</td> {/* ✅ Display total activity points */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <p>No students found for the selected criteria.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdViewStudents;
