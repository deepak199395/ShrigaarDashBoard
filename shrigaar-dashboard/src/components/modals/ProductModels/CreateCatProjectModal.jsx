import React, { useState } from "react";
import "./Modal.css";

const CreateCatProjectModal = ({
  isOpen,
  onClose,
  categories = [], 
}) => {
  const [formData, setFormData] = useState({
    categoryName: "",
    projectName: "",
    description: "",
    originalPrice: "",
    discountPercentage: "",
    imageUrl: "",
    inStock: true,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Category Project Data:", formData);

    // 🔜 Later:
    // axios.post("/api/category-projects/create", formData)

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create Category Project</h3>

        <form onSubmit={handleSubmit}>
          {/* CATEGORY DROPDOWN */}
          <select
            name="categoryName"
            className="modal-input"
            value={formData.categoryName}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id || cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
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
            <button
              type="button"
              className="btn cancel"
              onClick={onClose}
            >
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

export default CreateCatProjectModal;
