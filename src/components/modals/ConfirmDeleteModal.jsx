import React from "react";
import "./ProductModels/Modal.css";
import { useDispatch } from "react-redux";
import { deleteStaff } from "../../features/staff/staffSlice";

const ConfirmDeleteModal = ({ isOpen, onClose, staffData }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleConfirmDelete = () => {
    dispatch(deleteStaff(staffData._id));
    alert("Staff deleted successfully ✅");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Confirm Delete</h3>

        <p style={{ marginBottom: "20px", fontSize: "16px" }}>
          Are you sure you want to delete <strong>{staffData?.staffName}</strong>? This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn primary"
            style={{ backgroundColor: "#dc3545" }}
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
