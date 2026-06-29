import React, { useState, useEffect } from "react";
import "./ProductModels/Modal.css";
import { useDispatch } from "react-redux";
import { updateStaff } from "../../features/staff/staffSlice";

const UpdateStaffModal = ({ isOpen, onClose, staffData }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    city: "",
    salary: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staffData) {
      setFormData({
        city: staffData.city || "",
        salary: staffData.salary || "",
        position: staffData.position || "",
      });
    }
  }, [staffData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.city || !formData.salary || !formData.position) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      dispatch(
        updateStaff({
          id: staffData._id,
          updatedData: formData,
        })
      );
      alert("Staff updated successfully ✅");
      onClose();
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
        <h3>Update Staff</h3>

        <input
          type="text"
          placeholder="Enter city"
          className="modal-input"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />

        <input
          type="number"
          placeholder="Enter salary"
          className="modal-input"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Enter position"
          className="modal-input"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
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
            {loading ? "Updating..." : "Update Staff"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaffModal;
