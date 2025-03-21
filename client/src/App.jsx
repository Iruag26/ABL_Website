import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SelectRole from "./Pages/SelectRole";
import Topbar from "./Components/Topbar";

{/*Login Pages*/}
import StudentLogin from "./Pages/Student/studentLogin";
import AdminLogin from "./Pages/Admin/adLogin";
import ClubAdLogin from "./Pages/Club Admin/clubadLogin";
import MentorLogin from "./Pages/Mentor/mentorLogin";

{/*Mentor Pages*/}
import MHomepage from "./Pages/Mentor/mHomepage";
import ViewStudents from "./Pages/Mentor/ViewStudents";
import StudentDetails from "./Pages/Mentor/StudentDetails"
import MProfile from "./Pages/Mentor/MProfile";

{/*Student Pages*/}
import SHomepage from "./Pages/Student/sHomepage";
import SMakeEntry from "./Pages/Student/SMakeEntry";
import SCalendar from "./Pages/Student/SCalendar";
import SProfile from "./Pages/Student/SProfile";

{/*Club Admin Pages*/}
import CHomepage from "./Pages/Club Admin/cHomepage";
import CAddEvents from "./Pages/Club Admin/CAddEvents";
import CAdCalendar from "./Pages/Club Admin/CAdCalendar";
{/*Admin Pages*/}
import AHomepage from "./Pages/Admin/aHomepage";
import AddMentor from "./Pages/Admin/AddMentor";
import AddEvents from "./Pages/Admin/AddEvents";
import AdViewStudents from "./Pages/Admin/AdViewStudents";
import AdViewMentor from "./Pages/Admin/AdViewMentor";
import Adprofile from "./Pages/Admin/Adprofile";

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
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/get-student" element={<StudentDetails/>}/>
        <Route path="/get-student/:id" element={<StudentDetails />} /> 
        <Route path="/mprofile" element={<MProfile />} /> 

        {/* Student Pages */}
        <Route path="/sHomepage" element={<SHomepage />} />
        <Route path="/make-entry" element={<SMakeEntry />} />
        <Route path="/student-calendar" element={<SCalendar />} />
        <Route path="/profile" element={<SProfile />} />

        {/* Admin Pages */}
        <Route path="/aHomepage" element={<AHomepage />} />
        <Route path="/add-mentor" element={<AddMentor />} />
        <Route path="/add-events" element={<AddEvents />} />
        <Route path="/ad-view-students" element={<AdViewStudents />} />
        <Route path="/ad-view-mentor" element={<AdViewMentor />} />
        <Route path="/adprofile" element={<Adprofile />} />

        

        {/*Club Admin Pages*/}
        <Route path="/cHomepage" element={<CHomepage />} />
        <Route path="/cadd-events" element={<CAddEvents />} />
        <Route path="/cadmin-calendar" element={<CAdCalendar />} />

      </Routes>
    </Router>
  );
};

export default App;
