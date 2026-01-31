import React from "react";
import "./Modal.css";

const CreateCollectionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create New Collection</h3>

        <input
          type="text"
          placeholder="Enter collection name"
          className="modal-input"
        />

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn primary">
            Save Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionModal;
