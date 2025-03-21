import React, { useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import { submitStudentEntry } from "../../api/studentApi"; // Import API function
import "./css/SMakeEntry.css";

const SMakeEntry = () => {
  const [eventName, setEventName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({}); // Stores validation errors

  // 🔹 Validation Function
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    // 🔹 Activity Name Validation (Alphabets only, max 25 characters)
    if (!/^[A-Za-z\s]{1,25}$/.test(eventName)) {
      errors.eventName = "Alphabets should be present (max 25 characters)";
      isValid = false;
    }

    // 🔹 End Date Validation (Cannot be before Start Date)
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      errors.endDate = "End date cannot be before start date";
      isValid = false;
    }

    // 🔹 Activity Venue Validation (Alphabets only, max 25 characters)
    if (!/^[A-Za-z\s]{1,25}$/.test(venue)) {
      errors.venue = "Only alphabets allowed (max 25 characters)";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const formData = {
      a_name: eventName,
      a_type: activityType,
      a_sub_type: category,
      a_start_date: startDate,
      a_end_date: endDate,
      a_venue: venue,
      a_level: activityLevel,
    };

    try {
      const response = await submitStudentEntry(formData);
      setMessage(response.message || "Entry submitted successfully!");
      setErrors({}); // Clear errors on success
    } catch (error) {
      setMessage(error.response?.data?.error || "Error submitting entry.");
    }
  };

  return (
    <div>
      <SNavbar />
      <div className="make-entry-form">
        <div className="container mt-5">
          <h2 className="sentry-header mb-4">Activity Entry Form</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            
              {/* 🔹 Activity Name */}
              <div className="mb-3">
                <label htmlFor="eventName" className="form-label">Activity Name</label>
                <input type="text" className="form-control" id="eventName" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                {errors.eventName && <small className="text-danger">{errors.eventName}</small>}
              </div>

              {/* 🔹 Activity Start Date */}
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Activity Start Date</label>
                <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              </div>

              {/* 🔹 Activity End Date */}
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">Activity End Date</label>
                <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                {errors.endDate && <small className="text-danger">{errors.endDate}</small>}
              </div>

              {/* 🔹 Activity Venue */}
              <div className="mb-3">
                <label htmlFor="venue" className="form-label">Activity Venue</label>
                <input type="text" className="form-control" id="venue" placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} required />
                {errors.venue && <small className="text-danger">{errors.venue}</small>}
              </div>

              {/* 🔹 Activity Type */}
              <div className="mb-3">
                <label htmlFor="eventType" className="form-label">Activity Type</label>
                <select className="form-select" id="eventType" value={activityType} onChange={(e) => setActivityType(e.target.value)} required>
                  <option value="">Select Activity Type</option>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Social">Social</option>
                  <option value="Sports">Sports</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* 🔹 Activity Category */}
              {activityType && (
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Select Category of Your Activity</label>
                  <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select Category</option>
                    {activityType === "Technical" && (
                      <>
                        <option value="Attended/Organised Seminar">Attended/Organised Seminar</option>
                        <option value="Delivering Seminar">Delivering Seminar</option>
                        <option value="Attended Workshop">Attended Workshop</option>
                        <option value="Organized Workshop">Organized Workshop</option>
                        <option value="Delivered Workshop">Delivered Workshop</option>
                        <option value="Attended/Organized Competition">Attended/Organized Competition</option>
                        <option value="Won Competition">Won Competition</option>
                      </>
                    )}
                    {activityType === "Social" && (
                      <>
                        <option value="Donated Blood">Donated Blood</option>
                        <option value="Other Social Work">Other Social Work</option>
                      </>
                    )}
                    {activityType === "Sports" && (
                      <>
                        <option value="Participated">Participated</option>
                        <option value="Won Competition">Won Competition</option>
                      </>
                    )}
                    {activityType === "Cultural" && (
                      <>
                        <option value="Participated">Participated</option>
                        <option value="Won Competition">Won Competition</option>
                      </>
                    )}
                    {activityType === "Internship" && (
                      <>
                        <option value="Technical Internship">Technical Internship</option>
                        <option value="Managerial Internship">Managerial Internship</option>
                        <option value="Field Trip">Field Trip</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              {/* 🔹 Activity Level */}
              <div className="mb-3">
                <label htmlFor="activityLevel" className="form-label">Activity Level</label>
                <select className="form-select" id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} required>
                  <option value="">Select Activity Level</option>
                  <option value="Intra-Collegiate">Intra-Collegiate</option>
                  <option value="Inter-Collegiate">Inter-Collegiate(University-Level)</option>
                  <option value="State-Level">State Level</option>
                  <option value="National-Level">National Level</option>
                  <option value="International-Level">International Level</option>
                </select>
              </div>
            </div>

            {/* 🔹 Submit Button */}
            <button type="submit" className="entry-event-button btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SMakeEntry;
