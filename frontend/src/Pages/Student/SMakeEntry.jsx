import React, { useState } from "react";
import SNavbar from "../../Components/StudentC/SNavbar";
import "./css/SMakeEntry.css";

const SMakeEntry = () => {
  const [activityType, setActivityType] = useState(""); 
  const [category, setCategory] = useState(""); 
  const [subCategory, setSubCategory] = useState(""); // Track sub-category selection

  // Category options based on activity type
  const categoryOptions = {
    Technical: [
      "Technical Seminar",
      "Technical Workshop",
      "Technical Competition",
      "Passing NPTEL / Coursera / any other MOOCs",
      "Technical Paper Publication/Presentation",
      "Industrial Visit",
    ],
    Cultural: ["Participation in cultural activity", "Representation in university/state/national level competitions", "Won Competition"],
    Social: [
      "Participation in social activity",
      "Donated Blood",
    ],
    Sports: ["Participated in Sports", "Won Competition"],
    Internship: ["Internships", "Field visits ", "TnP coordination ", "Managerial Internship"],
  };

  const subCategoryOptions = {
    Technical: {
      "Technical Seminar": ["Attended/Organised Seminar", "Delivered Technical Seminar"],
      "Technical Workshop": ["Attended workshops", "Organized workshops", "Delivered a hands-on workshop"],
      "Technical Competition": ["Attended/Organised Competition", "Won Competition"],
      "Passing NPTEL / Coursera / any other MOOCs": ["Passed", "First Class", "Distinction"],
      "Technical Paper Publication/Presentation": ["National Conference", "International Conference"],
    },
    Social: {
      "Participation in university/state/national level competitions": [
        "University Level",
        "State Level",
        "National Level",
      ],
    },
    Cultural: {
      "Won Competition": ["University", "State Level", "National Level"],
    },
    Sports: {
      "Won Competition": ["University", "State Level", "National Level"],
    },
  };

  const handleActivityTypeChange = (event) => {
    setActivityType(event.target.value);
    setCategory(""); // Reset category when activity type changes
    setSubCategory(""); // Reset sub-category
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setSubCategory(""); // Reset sub-category when category changes
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  return (
    <div>
      <SNavbar />
      <div className="make-entry-form ">
        <div className="container mt-5">
          <h2 className="mb-4">Event Entry Form</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="eventName" className="form-label">
                Activity Name
              </label>
              <input
                type="text"
                className="form-control-s1"
                id="eventName"
                placeholder="Event Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="eventType" className="form-label">
                Activity Type
              </label>
              <select
                className="form-select-1"
                id="eventType"
                value={activityType}
                onChange={handleActivityTypeChange}
                required
              >
                <option value="">Select Activity Type</option>
                {Object.keys(categoryOptions).map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown */}
            {activityType && (
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Select Category of Your Activity
                </label>
                <select
                  className="form-select-1"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions[activityType].map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sub-Category Dropdown (Only for selected cases) */}
            {category && subCategoryOptions[activityType] && subCategoryOptions[activityType][category] && (
              <div className="mb-3">
                <label htmlFor="subCategory" className="form-label">
                  Select Sub-Category
                </label>
                <select
                  className="form-select-1"
                  id="subCategory"
                  value={subCategory}
                  onChange={handleSubCategoryChange}
                  required
                >
                  <option value="">Select Sub-Category</option>
                  {subCategoryOptions[activityType][category].map((subCat, index) => (
                    <option key={index} value={subCat}>
                      {subCat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="entry-event-button btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SMakeEntry;
