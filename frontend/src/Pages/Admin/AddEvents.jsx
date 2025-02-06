import React, { useState } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AddEvents.css";
import { addEvent2 } from "../../api/eventApi";

const AddEvents = () => {
  // State to store form input
  const [formData, setFormData] = useState({
    e_name: "",
    e_type: "",
    e_link: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value, // Dynamically update the field based on its id
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addEvent2(formData); // Call the API function with the form data
      alert("Activity added successfully!");
      // Clear form after submission
      setFormData({
        e_name: "",
        e_type: "",
        e_link: "",
      });
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Failed to add Activity.");
    }
  };

  return (
    <div>
      <AdNavbar />
      <form onSubmit={handleSubmit}>
        <div className="form2">
          <div className="add-event-text-header">Add Activity</div>

          <div className="add-event-text event-name">Activity Name:</div>
          <input
            className="form-control-2 form-control-sm"
            type="text"
            id="e_name"
            value={formData.e_name}
            onChange={handleInputChange}
            placeholder="Enter activity name"
            required
          />

          <div className="add-event-text">Activity Type:</div>
          <select
            className="form-select-2"
            id="e_type"
            value={formData.e_type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            <option value="External">Outside college</option>
          </select>

          <div className="add-event-text event-name">Activity Registration Link:</div>
          <input
            className="form-control-2 form-control-sm"
            type="text"
            id="e_link"
            value={formData.e_link}
            onChange={handleInputChange}
            placeholder="Enter registration link"
            required
          />

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
