import React, { useState } from "react";
import AdNavbar from "../../Components/AdminC/AdNavbar";
import "./css/AddMentor.css";
import { addMentor } from "../../api/mentorAddApi"; // Updated API function

const AddMentor = () => {
  const [formData, setFormData] = useState({
    m_username: "",
    m_password: "",
    m_name: "",
    m_batch: "",
    m_sem: "",
    m_csec: "",
    m_branch: "",
  });

  // Handle changes for form inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addMentor(formData); // Single API call
      alert("Mentor added successfully!");
    } catch (error) {
      console.error("Error adding mentor:", error);
      alert("Failed to add mentor.");
    }
  };

  return (
    <div>
      <AdNavbar />
      <form
        className="main-box row g-3 needs-validation"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="add-mentor-text">Add Mentor</div>

        {/* Mentor Authentication Details */}
        <div className="col-sm-4">
          <label htmlFor="m_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="m_name"
            value={formData.m_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="m_username"
            value={formData.m_username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="m_password"
            value={formData.m_password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Mentor Details */}
        <div className="col-sm-4">
          <label htmlFor="m_batch" className="form-label">
            Batch
          </label>
          <input
            type="number"
            className="form-control"
            id="m_batch"
            value={formData.m_batch}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_sem" className="form-label">
            Semester
          </label>
          <input
            type="number"
            className="form-control"
            id="m_sem"
            value={formData.m_sem}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_csec" className="form-label">
            Class Section
          </label>
          <input
            type="text"
            className="form-control"
            id="m_csec"
            value={formData.m_csec}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_branch" className="form-label">
            Branch
          </label>
          <input
            type="text"
            className="form-control"
            id="m_branch"
            value={formData.m_branch}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMentor;
