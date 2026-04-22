import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

const CreateCategoryModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!name || !description || !image) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://api.shrigaar.com/api/v1/shrigar/CreateCategories/get/api53",
        {
          name,
          description,
          image,
          isActive: true,
        }
      );

      if (response.data.success) {
        alert("Category created successfully ✅");

        // reset fields
        setName("");
        setDescription("");
        setImage("");

        // close modal
        onClose();
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create New Category</h3>

        <input
          type="text"
          placeholder="Enter category name"
          className="modal-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter description"
          className="modal-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter image URL"
          className="modal-input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;