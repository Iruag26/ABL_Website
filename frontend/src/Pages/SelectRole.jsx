import React from "react";
import "./css/SelectRole.css";
import Topbar from "../Components/Topbar";
import { Link } from "react-router-dom";

const SelectRole = () => {
  return (
    <div>
      <Topbar />
      <div className="ec">
        <div id="textbox">
          <div className="welcomeText">
            Welcome To Activity Based Learning Portal!
          </div>
        </div>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Role ✅
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/student-login">
                Student
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/admin-login">
                Admin
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/club-admin-login">
                Club Admin
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/mentor-login">
                Mentor
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
