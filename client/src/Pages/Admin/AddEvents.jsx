import React, { useState, useRef } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AddEvents.css"; // Reusing the same CSS as Club Admin
import { addEvent } from "../../api/eventApi"; // Same API as Club Admin

const AddEvents = () => {
  const [formData, setFormData] = useState({
    e_name: "",
    e_org: "",
    e_cost: "",
    e_type: "",
    e_category: "",
    e_img: null,
    e_date: "",
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
  
    // Minimal validation
    if (!formData.e_name.trim()) {
      alert("Activity Name is required.");
      return;
    }
    if (!formData.e_link.trim()) {
      alert("Activity Registration Link is required.");
      return;
    }
    if (!formData.e_type.trim()) {
      alert("Activity Type is required.");
      return;
    }
  
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "e_date") {
        const isValidDate = value && !isNaN(Date.parse(value));
        if (isValidDate) {
          data.append("e_date", value);
        }
      } else {
        data.append(key, value);
      }
    });
  
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
        e_link: "",
        e_description: "",
      });
  
      if (imgInputRef.current) {
        imgInputRef.current.value = "";
      }
    } catch (error) {
      alert("Failed to add Activity.");
    }
  };
  

  return (
    <div>
      <AdNavbar />
      <div className="cad-form-heading">Activity Details</div>
      <form className="cad-event-form" onSubmit={handleSubmit}>
        <div className="CAdForm-Labels">
          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Name:</div>
            <input
              className="form-control-1"
              type="text"
              id="e_name"
              value={formData.e_name}
              onChange={handleInputChange}
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Organizer Name:</div>
            <input
              className="form-control-1"
              type="text"
              id="e_org"
              value={formData.e_org}
              onChange={handleInputChange}
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Registration Fee:</div>
            <input
              className="form-control-1"
              type="number"
              id="e_cost"
              value={formData.e_cost}
              onChange={handleInputChange}
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Type:</div>
            <select
              className="form-select-1"
              id="e_type"
              value={formData.e_type}
              onChange={handleInputChange}
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
            <div className="cad-add-event-text">Activity Category:</div>
            <select
              className="form-select-1"
              id="e_category"
              value={formData.e_category}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Internship">Social</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Add Image</div>
            <input
              type="file"
              className="form-control-1"
              id="e_img"
              onChange={handleInputChange}
              ref={imgInputRef}
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Date:</div>
            <input
              className="form-control-1"
              type="date"
              id="e_date"
              value={formData.e_date}
              onChange={handleInputChange}
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Registration Link:</div>
            <input
              className="form-control-1"
              type="text"
              id="e_link"
              value={formData.e_link}
              onChange={handleInputChange}
            />
          </div>

          <div className="CAddFormElements">
            <div className="cad-add-event-text">Activity Description:</div>
            <textarea
              className="form-control-1"
              id="e_description"
              rows="3"
              value={formData.e_description}
              onChange={handleInputChange}
              placeholder="Describe the activity briefly..."
            ></textarea>
          </div>

          <div className="event-buttons col-12">
            <button className="event-button btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
