import React, { useState, useRef } from "react";
import "./css/CAddEvents.css";
import { addEvent } from "../../api/eventApi";
import CAdNavbar from "../../Components/CAdminC/CAdNavbar";

const CAddEvents = () => {
  const [formData, setFormData] = useState({
    e_name: "",
    e_org: "",
    e_cost: "",
    e_type: "",
    e_category: "",
    e_img: null,
    e_date: "",
    e_start_time: "",
    e_end_time: "",
    e_link: "",
    e_description: "",
  });

  const imgInputRef = useRef();

  const handleInputChange = (e) => {
    const { id, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, e_img: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const selectedDate = new Date(formData.e_date);

    if (!formData.e_date || isNaN(selectedDate.getTime()) || selectedDate < today.setHours(0, 0, 0, 0)) {
      alert("Please enter a valid date that is today or in the future.");
      return;
    }

    if (!formData.e_start_time || !formData.e_end_time) {
      alert("Please enter both start time and end time.");
      return;
    }

    if (formData.e_end_time <= formData.e_start_time) {
      alert("End time must be after start time.");
      return;
    }

    if (!formData.e_img) {
      alert("Please upload an image.");
      return;
    }

    const data = new FormData();
    data.append("e_name", formData.e_name);
    data.append("e_org", formData.e_org);
    data.append("e_cost", formData.e_cost);
    data.append("e_type", formData.e_type);
    data.append("e_category", formData.e_category);
    data.append("e_img", formData.e_img);
    data.append("e_date", formData.e_date);
    data.append("e_start_time", formData.e_start_time);
    data.append("e_end_time", formData.e_end_time);
    data.append("e_link", formData.e_link);
    data.append("e_description", formData.e_description);

    try {
      await addEvent(data);
      alert("Activity added successfully!");

      setFormData({
        e_name: "",
        e_org: "",
        e_cost: "",
        e_type: "",
        e_category: "",
        e_img: null,
        e_date: "",
        e_start_time: "",
        e_end_time: "",
        e_link: "",
        e_description: "",
      });

      if (imgInputRef.current) {
        imgInputRef.current.value = null;
      }
    } catch (error) {
      alert("Failed to add Activity.");
    }
  };

  return (
    <div>
      <CAdNavbar />
      <div className="cad-form-heading">Activity Details</div>
      <form className="cad-event-form" onSubmit={handleSubmit}>
        <div className="CAdForm-Labels">
          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Name: *</div>
            <input
              className="form-control-1"
              type="text"
              id="e_name"
              value={formData.e_name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Organized By (Club / Dept / Chapter): *</div>
            <input
              className="form-control-1"
              type="text"
              id="e_org"
              value={formData.e_org}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Registration Fee: *</div>
            <input
              className="form-control-1"
              type="number"
              id="e_cost"
              value={formData.e_cost}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Type: *</div>
            <select
              className="form-select-1"
              id="e_type"
              value={formData.e_type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select</option>
              <option value="Intracollegiate">Intra-collegiate</option>
              <option value="Intercollegiate">Inter-collegiate (University)</option>
              <option value="State">State Level</option>
              <option value="National">National Level</option>
              <option value="International">International Level</option>
            </select>
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Category: *</div>
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
              <option value="Social">Social</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Add Image: *</div>
            <input
              type="file"
              className="form-control-1"
              id="e_img"
              onChange={handleInputChange}
              ref={imgInputRef}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Date: *</div>
            <input
              className="form-control-1"
              type="date"
              id="e_date"
              value={formData.e_date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Start Time: *</div>
            <input
              className="form-control-1"
              type="time"
              id="e_start_time"
              value={formData.e_start_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity End Time: *</div>
            <input
              className="form-control-1"
              type="time"
              id="e_end_time"
              value={formData.e_end_time}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Registration Link: *</div>
            <input
              className="form-control-1"
              type="text"
              id="e_link"
              value={formData.e_link}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Description: *</div>
            <textarea
              className="form-control-1"
              id="e_description"
              rows="3"
              placeholder="Describe the activity briefly..."
              value={formData.e_description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="event-buttons col-12">
            <button className="cad-button event-button btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CAddEvents;
