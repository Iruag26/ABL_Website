import React, { useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import { submitStudentEntry } from "../../api/studentApi";
import "./css/SMakeEntry.css";

const SMakeEntry = () => {
  const [eventName, setEventName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isValid = true;
    let errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!/^[A-Za-z\s]{1,25}$/.test(eventName)) {
      errors.eventName = "Alphabets should be present (max 25 characters)";
      isValid = false;
    }

    if (start >= today) {
      errors.startDate = "Start date must be before today";
      isValid = false;
    }

    if (end >= today) {
      errors.endDate = "End date must be before today";
      isValid = false;
    }

    if (startDate && endDate && end < start) {
      errors.endDate = "End date cannot be before start date";
      isValid = false;
    }

    if (!/^[A-Za-z\s]{1,25}$/.test(venue)) {
      errors.venue = "Only alphabets allowed (max 25 characters)";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
      alert(response.message || "Entry submitted successfully!");
      setErrors({});
      clearForm();
    } catch (error) {
      alert(error.response?.data?.error || "Error submitting entry.");
    }
  };

  const clearForm = () => {
    setEventName("");
    setActivityType("");
    setCategory("");
    setStartDate("");
    setEndDate("");
    setVenue("");
    setActivityLevel("");
    setErrors({});
  };

  return (
    <div>
      <SNavbar />
      <div className="make-entry-form">
        <div className="container mt-5">
          <h2 className="sentry-header mb-4">Activity Entry Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="mb-3">
                <label htmlFor="eventName" className="form-label">Activity Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventName"
                  placeholder="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
                {errors.eventName && <small className="text-danger">{errors.eventName}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Activity Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
                {errors.startDate && <small className="text-danger">{errors.startDate}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">Activity End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
                {errors.endDate && <small className="text-danger">{errors.endDate}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="venue" className="form-label">Activity Venue</label>
                <input
                  type="text"
                  className="form-control"
                  id="venue"
                  placeholder="Venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
                {errors.venue && <small className="text-danger">{errors.venue}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="eventType" className="form-label">Activity Type</label>
                <select
                  className="form-select"
                  id="eventType"
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  required
                >
                  <option value="">Select Activity Type</option>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Social">Social</option>
                  <option value="Sports">Sports</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">Select Category of Your Activity</label>
                <select
                  className="form-select"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
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

              <div className="mb-3">
                <label htmlFor="activityLevel" className="form-label">Activity Level</label>
                <select
                  className="form-select"
                  id="activityLevel"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  required
                >
                  <option value="">Select Activity Level</option>
                  <option value="Intra-Collegiate">Intra-Collegiate</option>
                  <option value="Inter-Collegiate(University-Level)">Inter-Collegiate(University-Level)</option>
                  <option value="State Level">State Level</option>
                  <option value="National Level">National Level</option>
                  <option value="International Level">International Level</option>
                </select>
              </div>
            </div>

            {/* Submit + Clear Buttons */}
            <div className="d-flex gap-2 justify-content-end mt-3">
              <button type="submit" className="entry-event-button btn btn-success">
                Submit
              </button>
              <button
                type="button"
                className="entry-event-button btn btn-outline-danger"
                onClick={clearForm}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SMakeEntry;
