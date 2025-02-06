import React, { useState } from "react";
import "./css/CAddEvents.css";
import { addEvent } from "../../api/eventApi"; // Import the API function
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";

const CAddEvents = () => {
  const [formData, setFormData] = useState({
    e_name: "",
    e_org: "",
    e_cost: "",
    e_type: "",
    e_category: "",
    e_img: null,
    e_date:"",
    e_link:"",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, e_img: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("e_name", formData.e_name);
    data.append("e_org", formData.e_org);
    data.append("e_cost", formData.e_cost);
    data.append("e_type", formData.e_type);
    data.append("e_category", formData.e_category);
    data.append("e_img", formData.e_img);
    data.append("e_date", formData.e_date);
    data.append("e_link", formData.e_link);


    try {
      await addEvent(data); // Call the API function
      alert("Activity added successfully!");
    } catch (error) {
      alert("Failed to add Activity.");
    }
  };

  return (
    <div>
      <CAdNavbar />
      <form onSubmit={handleSubmit}>
        <form1>
          <div className="add-event-text-header">Add Activity</div>
          <div className="add-event-text event-name">Activity Name:</div>
          <input
            className="form-control-1 form-control-sm"
            type="text"
            id="e_name"
            value={formData.e_name}
            onChange={handleInputChange}
            required
          />
          <div className="add-event-text">Organizer Name:</div>
          <input
            className="form-control-1 form-control-sm"
            type="text"
            id="e_org"
            value={formData.e_org}
            onChange={handleInputChange}
            required
          />
          <div className="add-event-text">Activity Registration Fee:</div>
          <input
            className="form-control-1 form-control-sm"
            type="number"
            id="e_cost"
            value={formData.e_cost}
            onChange={handleInputChange}
            required
          />
          <div className="add-event-text">Activity Type:</div>
          <select
            className="form-select-1"
            id="e_type"
            value={formData.e_type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Internal">Intracollegiate </option>
          </select>
          <div className="add-event-text">Activity Category:</div>
          <select
            className="form-select-1"
            id="e_category"
            value={formData.e_category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="Technical">Technical</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Internship">Social</option>
            <option value="Internship">Internship</option>
          </select>
          <div className="add-event-text">Add Image</div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="e_img"
              onChange={handleInputChange}
            />
          </div>
          <div className="add-event-text event-name">Enter the date on which activity is taking place:</div>
          <input
            className="form-control-1 form-control-sm"
            type="date"
            id="e_date"
            value={formData.e_date}
            onChange={handleInputChange}
            required
          />
          <div className="add-event-text event-name">Activity Registration Link:</div>
          <input
            className="form-control-1 form-control-sm"
            type="text"
            id="e_link"
            value={formData.e_link}
            onChange={handleInputChange}
            required
          />
          <div className="event-buttons col-12">
            <button className="event-button btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </form1>
      </form>
    </div>
  );
};

export default CAddEvents;
//sample form link: https://docs.google.com/forms/d/e/FORM_ID/viewform