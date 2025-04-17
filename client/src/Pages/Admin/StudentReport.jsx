import React from "react";
import "./css/StudentReport.css";
import logo from "../../assets/fcritlogo.png";

const StudentReport = ({ student, activities }) => {
  return (
    <div className="student-report" id={`report-${student.s_id}`}>
      {/* Header with logo */}
      <div className="report-header d-flex justify-content-between align-items-center mb-3">
        <img src={logo} alt="FCRIT Logo" className="fcrit-logo" />
        <div className="text-center w-100">
          <h2>FR. C. RODRIGUES INSTITUTE OF TECHNOLOGY</h2>
          <h5 className="mb-1">(An Autonomous Institute, Vashi, Navi Mumbai)</h5>
          <h4>Department of {student.s_branch}</h4>
        </div>
      </div>

      <hr />

      {/* Student Info */}
      <div className="student-info">
        <p><strong>Name:</strong> {student.s_name}</p>
        <p><strong>Roll Number:</strong> {student.s_username}</p>
        <p><strong>Department:</strong> {student.s_branch}</p>
        <p><strong>Division:</strong> {student.s_csec}</p>
        <p><strong>Total Points:</strong> {student.total_points} / 100</p>
      </div>

      {/* Activity Table */}
      <h5 className="text-center mt-4">Activity Participation Details</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Activity Name</th>
            <th>Type</th>
            <th>Sub Type</th>
            <th>Level</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act, idx) => (
            <tr key={idx}>
              <td>{act.a_name}</td>
              <td>{act.a_type}</td>
              <td>{act.a_sub_type}</td>
              <td>{act.a_level}</td>
              <td>{act.a_points_scored}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Signatures */}
      <div className="d-flex justify-content-between mt-5 px-4">
        <p><strong>HOD Signature:</strong> _____________________</p>
        <p><strong>Principal Signature:</strong> _____________________</p>
      </div>
    </div>
  );
};

export default StudentReport;
