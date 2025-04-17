import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MNavbar from "../../Components/MentorC/MNavbar";
import { FetchStudentList, fetchStudentSemSec } from "../../api/mentorApi"; // 👈 add this
import "./css/ViewStudents.css";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [semSecMap, setSemSecMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const studentData = await FetchStudentList();
      setStudents(studentData);

      const s_ids = studentData.map((s) => s.s_id);
      const semSecData = await fetchStudentSemSec(s_ids);

      const map = {};
      semSecData.forEach((item) => {
        map[item.s_id] = { sem: item.s_sem, sec: item.s_csec };
      });

      setSemSecMap(map);
    };

    fetchData();
  }, []);

  const handleStudentClick = (s_id, s_name) => {
    navigate(`/get-student/${s_id}`, { state: { studentName: s_name } });
  };

  return (
    <div>
      <MNavbar />
      <div className="mentor-view-students-page">
        <h4 className="text-left mentorviewstudentlistheader">
          Student List For Mentoring Batch:
        </h4>

        <div className="view-students-container">
          {students.length === 0 ? (
            <p className="text-center">No students found.</p>
          ) : (
            <table className="table-student-list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Division</th>
                  <th>Semester</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.s_id}>
                    <td>{index + 1}</td>
                    <td>
                      <button
                        className="student-name-btn"
                        onClick={() => handleStudentClick(student.s_id, student.s_name)}
                      >
                        {student.s_name}
                      </button>
                    </td>
                    <td>{student.s_username}</td>
                    <td>{semSecMap[student.s_id]?.sec || "-"}</td>
                    <td>{semSecMap[student.s_id]?.sem || "-"}</td>
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
