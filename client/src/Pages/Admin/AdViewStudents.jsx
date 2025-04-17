import React, { useState, useEffect } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AdViewStudents.css";
import { fetchStudentsTypeWise } from "../../api/adminApi";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import StudentReport from "./StudentReport.jsx";

const AdViewStudents = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [appliedSection, setAppliedSection] = useState("");
  const [appliedBranch, setAppliedBranch] = useState("");
  const [appliedSemester, setAppliedSemester] = useState("");

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [reportStudent, setReportStudent] = useState(null);
  const [reportActivities, setReportActivities] = useState([]);

  const sections = ["A", "B"];
  const branches = ["Computer", "Mechanical", "IT", "EXTC", "Electrical"];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchStudents = async () => {
    if (!selectedSection || !selectedBranch || !selectedSemester) {
      alert("Please select all fields before fetching students.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchStudentsTypeWise(
        selectedSection,
        selectedBranch,
        selectedSemester
      );
      setStudents(data);
      setAppliedSection(selectedSection);
      setAppliedBranch(selectedBranch);
      setAppliedSemester(selectedSemester);
    } catch (err) {
      setError("Failed to fetch students. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = async (studentId) => {
    console.log("🎯 Calling backend for studentId:", studentId);
  
    try {
      const response = await fetch(`http://localhost:5000/api/admin/activities/${studentId}`);
      const contentType = response.headers.get("content-type");
  
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        const html = await response.text();
        console.error("❌ Backend returned HTML instead of JSON:\n", html);
        return;
      }
  
      const data = await response.json();
      console.log("✅ Response JSON:", data);
  
      const { student: updatedStudent, activities } = data;
  
      if (!updatedStudent || activities.length === 0) {
        console.warn("⚠️ Empty student or activities");
        return;
      }
  
      setReportStudent(updatedStudent);
      setReportActivities(activities);
    } catch (error) {
      console.error("🚨 Error generating report:", error);
    }
  };
  

  // 🔥 Auto-generate PDF once reportStudent is set
  useEffect(() => {
    const generatePDF = async () => {
      if (reportStudent) {
        const id = reportStudent.s_id;
        const reportEl = document.getElementById(`report-${id}`);

        if (!reportEl) {
          console.error("❌ Could not find report element in DOM.");
          return;
        }

        const canvas = await html2canvas(reportEl);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${reportStudent.s_name}_Report.pdf`);

        setReportStudent(null);
        setReportActivities([]);
      }
    };

    generatePDF();
  }, [reportStudent]);

  const handleGenerateAllReports = () => {
    alert("Generating report for all students...");
  };

  const calculateAverageExcludingOutliers = (category) => {
    const values = students
      .map((s) => s[category])
      .filter((v) => v !== null && !isNaN(v));
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length / 4)];
    const q3 = sorted[Math.ceil(sorted.length * (3 / 4))];
    const iqr = q3 - q1;
    const lower = q1 - 1.5 * iqr;
    const upper = q3 + 1.5 * iqr;
    const filtered = values.filter((v) => v >= lower && v <= upper);
    const avg = filtered.reduce((sum, val) => sum + val, 0) / filtered.length;
    return Math.round(avg);
  };

  const averageChartData = {
    labels: ["Technical", "Cultural", "Sports", "Social", "Internship"],
    datasets: [
      {
        label: "Average Points (Excluding Outliers)",
        data: [
          calculateAverageExcludingOutliers("technical_points"),
          calculateAverageExcludingOutliers("cultural_points"),
          calculateAverageExcludingOutliers("sports_points"),
          calculateAverageExcludingOutliers("social_points"),
          calculateAverageExcludingOutliers("internship_points"),
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div>
      <AdNavbar />
      <div className="adview-students-main">
        <h5>Select Section, Branch & Semester to View Students</h5>

        <div className="dropdown-container">
          <select
            className="form-control"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {sections.map((sec, index) => (
              <option key={index} value={sec}>
                {sec}
              </option>
            ))}
          </select>

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

          <select
            className="form-control"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {semesters.map((sem, index) => (
              <option key={index} value={sem}>
                {sem}
              </option>
            ))}
          </select>

          <button className="btn btn-outline-primary" onClick={fetchStudents}>
            Fetch Students
          </button>
        </div>

        <div className="adview-students-barplot">
          {students.length > 0 ? (
            <Bar
              data={averageChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: "Average Points" },
                  },
                  x: { title: { display: true, text: "Activity Category" } },
                },
              }}
            />
          ) : (
            <p>No data available for the selected criteria.</p>
          )}
        </div>

        <div className="students-table">
          {loading ? (
            <p>Loading students...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : students.length > 0 ? (
            <>
              {appliedSemester === "8" && (
                <button
                  className="btn btn-outline-success mb-3"
                  onClick={handleGenerateAllReports}
                >
                  Generate Report for All
                </button>
              )}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Batch</th>
                    <th>Semester</th>
                    <th>Section</th>
                    <th>Branch</th>
                    <th>Technical</th>
                    <th>Cultural</th>
                    <th>Sports</th>
                    <th>Social</th>
                    <th>Internship</th>
                    <th>Total Points</th>
                    {appliedSemester === "8" && <th>Generate Report</th>}
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
                      <td>{student.technical_points}</td>
                      <td>{student.cultural_points}</td>
                      <td>{student.sports_points}</td>
                      <td>{student.social_points}</td>
                      <td>{student.internship_points}</td>
                      <td>{student.total_points}</td>
                      {appliedSemester === "8" && (
                        <td>
                          <button
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => handleGenerateReport(student.s_id)}
                          >
                            Generate
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>No students found for the selected criteria.</p>
          )}
        </div>
      </div>

      {/* Hidden report for PDF generation */}
      {reportStudent && (
        <div style={{ position: "absolute", left: "-9999px" }}>
          <StudentReport
            student={reportStudent}
            activities={reportActivities}
          />
        </div>
      )}
    </div>
  );
};

export default AdViewStudents;
