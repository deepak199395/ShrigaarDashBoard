import React, { useState } from "react";
import "./Modal.css";

const CreateCollProjectModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    collectionName: "",
    projectName: "",
    description: "",
    originalPrice: "",
    discountPercentage: "",
    inStock: true,
    image: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Project Data:", formData);

    // 🔜 Later: API call here
    // axios.post("/api/projects/create", formData)

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create Project</h3>

        <form onSubmit={handleSubmit}>
         <select 
         name="collectionName"
         className="modal-input"
         value={formData.description}
         onChange={handleChange}
         required
         >

         </select>

          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            className="modal-input"
            value={formData.projectName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Project Description"
            className="modal-input"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            className="modal-input"
            value={formData.originalPrice}
            onChange={handleChange}
            min="0"
          />

          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount Percentage (%)"
            className="modal-input"
            value={formData.discountPercentage}
            onChange={handleChange}
            min="0"
            max="100"
          />

           <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (https://...)"
            className="modal-input"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            In Stock
          </label>

          <div className="modal-actions">
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollProjectModal;
