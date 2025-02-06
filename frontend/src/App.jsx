import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SelectRole from "./Pages/SelectRole";

import StudentLogin from "./Pages/Student/studentLogin";
import AdminLogin from "./Pages/Admin/adLogin";
import ClubAdLogin from "./Pages/Club Admin/clubadLogin";
import MentorLogin from "./Pages/Mentor/mentorLogin";

import SHomepage from "./Pages/Student/sHomepage";
import CHomepage from "./Pages/Club Admin/cHomepage";
import MHomepage from "./Pages/Mentor/mHomepage";

import AHomepage from "./Pages/Admin/aHomepage";
import AddMentor from "./Pages/Admin/AddMentor";
import AddEvents from "./Pages/Admin/AddEvents";
import ViewStudents from "./Pages/Admin/ViewStudents";

import Topbar from "./Components/Topbar";
import CAddEvents from "./Pages/Club Admin/CAddEvents";
import SMakeEntry from "./Pages/Student/SMakeEntry";
import SCalendar from "./Pages/Student/SCalendar";

const App = () => {
  return (
    <Router>
      <Topbar /> {/* Always displayed */} 
      <Routes>
        {/* Role Selection */}
        <Route path="/" element={<SelectRole />} />

        {/* Login Pages */}
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/club-admin-login" element={<ClubAdLogin />} />
        <Route path="/mentor-login" element={<MentorLogin />} />

        {/* Mentor pages */}
        <Route path="/mHomepage" element={<MHomepage />} />

        {/* Student Pages */}
        <Route path="/sHomepage" element={<SHomepage />} />
        <Route path="/make-entry" element={<SMakeEntry />} />
        <Route path="/student-calendar" element={<SCalendar />} />

        {/* Admin Pages */}
        <Route path="/aHomepage" element={<AHomepage />} />
        <Route path="/add-mentor" element={<AddMentor />} />
        <Route path="/add-events" element={<AddEvents />} />
        <Route path="/view-students" element={<ViewStudents />} />

        {/*Club Admin Pages*/}
        <Route path="/cHomepage" element={<CHomepage />} />
        <Route path="/cadd-events" element={<CAddEvents />} />

      </Routes>
    </Router>
  );
};

export default App;
