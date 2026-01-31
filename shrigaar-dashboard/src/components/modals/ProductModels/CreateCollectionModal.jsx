import React, { useState } from "react";
import axios from "axios";
import "./Modal.css";

const CreateCollectionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  // ✅ Correct handleChange
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Correct handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://devdeepak-backend-api-fbdhhyeddwbab9da.centralindia-01.azurewebsites.net/api/v1/shrigar/collections/create/api51",
        formData
      );

      if (response.data.success) {
        alert("✅ Collection created successfully");
        onClose();
        setFormData({
          name: "",
          image: "",
          isActive: true,
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create collection"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create New Collection</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Collection Name"
            className="modal-input"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (https://...)"
            className="modal-input"
            value={formData.image}
            onChange={handleChange}
          />

          {/* Optional: keep isActive always true */}
          <input type="hidden" name="isActive" value="true" />

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="btn cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? "Saving..." : "Save Collection"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateCollectionModal;
