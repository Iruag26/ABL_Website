import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MNavbar from "../../Components/MentorC/MNavbar";
import { FetchStudentList } from "../../api/mentorApi";
import "./css/ViewStudents.css";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await FetchStudentList();
      setStudents(studentData);
    };
    fetchData();
  }, []);
 
  const handleStudentClick = (s_id, s_name) => {
    console.log("Navigating with:", { s_id, s_name }); 
    navigate(`/get-student/${s_id}`, { state: { studentName: s_name } });
  };

  return (
    <div>
      <MNavbar />
      <div className="mentor-view-students-page">
        <h4 className="text-left mentorviewstudentlistheader">Student List For Mentoring Batch:</h4>
              

        <div className="view-students-container">
          {students.length === 0 ? (
            <p className="text-center">No students found.</p>
          ) : (
            <table className="table-student-list">
              <thead>
                <tr>
                  <th>S_ID</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.s_id}>
                    <td>{student.s_id}</td>
                    <td>
                      <button
                        className="student-name-btn"
                        onClick={() => handleStudentClick(student.s_id, student.s_name)}
                      >
                        {student.s_name}
                      </button>
                    </td>
                    <td>{student.s_username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;