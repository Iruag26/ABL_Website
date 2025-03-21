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

  const [errors, setErrors] = useState({}); // State to track validation errors

  const branches = ["Computer", "Mechanical", "EXTC", "IT", "Electrical"];
  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString()); // ["1", "2", ..., "8"]
  const sections = ["A", "B"];
  const batches = ["1", "2", "3", "4"];

  // Handle changes for form inputs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear error when user starts typing
  };

  // ✅ Form Validation Function
  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      await addMentor(formData);
      alert("Mentor added successfully!");
    } catch (error) {
      console.error("Error adding mentor:", error);
      alert("Failed to add mentor.");
    }
  };

  return (
    <div>
      <AdNavbar />
      <form className="main-box row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
        <div className="add-mentor-text"> Assign a Mentor to Batch </div>

        {/* Mentor Authentication Details */}
        <div className="col-sm-4">
          <label htmlFor="m_name" className="form-label">Name</label>
          <input type="text" className="form-control" id="m_name" value={formData.m_name} onChange={handleInputChange} />
          {errors.m_name && <small className="text-danger">{errors.m_name}</small>}
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_username" className="form-label">Username</label>
          <input type="text" className="form-control" id="m_username" value={formData.m_username} onChange={handleInputChange} />
          {errors.m_username && <small className="text-danger">{errors.m_username}</small>}
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_password" className="form-label">Password</label>
          <input type="password" className="form-control" id="m_password" value={formData.m_password} onChange={handleInputChange} />
          {errors.m_password && <small className="text-danger">{errors.m_password}</small>}
        </div>

        {/* Mentor Details */}
        <div className="col-sm-4">
          <label htmlFor="m_batch" className="form-label">Batch</label>
          <select className="form-control" id="m_batch" value={formData.m_batch} onChange={handleInputChange}>
            <option value="">Select Batch</option>
            {batches.map((batch, index) => (
              <option key={index} value={batch}>{batch}</option>
            ))}
          </select>
          {errors.m_batch && <small className="text-danger">{errors.m_batch}</small>}
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_sem" className="form-label">Semester</label>
          <select className="form-control" id="m_sem" value={formData.m_sem} onChange={handleInputChange}>
            <option value="">Select Semester</option>
            {semesters.map((sem, index) => (
              <option key={index} value={sem}>{sem}</option>
            ))}
          </select>
          {errors.m_sem && <small className="text-danger">{errors.m_sem}</small>}
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_csec" className="form-label">Class Section</label>
          <select className="form-control" id="m_csec" value={formData.m_csec} onChange={handleInputChange}>
            <option value="">Select Section</option>
            {sections.map((sec, index) => (
              <option key={index} value={sec}>{sec}</option>
            ))}
          </select>
          {errors.m_csec && <small className="text-danger">{errors.m_csec}</small>}
        </div>

        <div className="col-sm-4">
          <label htmlFor="m_branch" className="form-label">Branch</label>
          <select className="form-control" id="m_branch" value={formData.m_branch} onChange={handleInputChange}>
            <option value="">Select Branch</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>{branch}</option>
            ))}
          </select>
          {errors.m_branch && <small className="text-danger">{errors.m_branch}</small>}
        </div>

        <div>
          <button type="submit" className="btn btn-outline-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddMentor;
