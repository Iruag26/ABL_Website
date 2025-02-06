import React from "react";

const SNavbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          {/* Navbar Toggler for Collapse */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="/sHomepage">
                Home
              </a>
              <a className="nav-link" href="/student-calendar">
                Calendar
              </a>
              <a className="nav-link" href="/make-entry">
                Make Entry
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SNavbar;
