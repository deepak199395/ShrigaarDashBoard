import React from "react";
import "./Modal.css";

const CreateCategoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create New Category</h3>

        <input
          type="text"
          placeholder="Enter category name"
          className="modal-input"
        />

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary">
            Save Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
