import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

/* ---------------- INITIAL STATE ---------------- */
const initialFormState = {
  collectionId: "",
  productName: "",
  description: "",
  originalPrice: "",
  discountPercentage: "",
  imageUrl: "",
  inStock: true,
};

const CreateCollProjectModal = ({ isOpen, onClose }) => {
  const [collections, setCollections] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- FETCH COLLECTIONS ---------------- */
  const fetchCollections = async () => {
    try {
      const res = await axios.get(
        "https://api.shrigaar.com/api/v1/shrigar/collections/list/api52"
      );

      if (res.data.success && res.data.flage === "Y") {
        setCollections(res.data.collection || []);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load collections");
    }
  };

  /* ---------------- RESET ON OPEN ---------------- */
  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
      setError("");
      fetchCollections();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  /* ---------------- CLOSE HANDLER ---------------- */
  const handleClose = () => {
    setFormData(initialFormState);
    setError("");
    onClose();
  };

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        collectionId: formData.collectionId,
        productName: formData.productName,
        description: formData.description,
        image: formData.imageUrl,
        originalPrice: Number(formData.originalPrice),
        discountPercentage: Number(formData.discountPercentage),
        priceAfterDiscount:
          Number(formData.originalPrice) -
          (Number(formData.originalPrice) *
            Number(formData.discountPercentage)) /
            100,
        inStock: formData.inStock,
      };

      console.log("🚀 Create Project Payload:", payload);

      const res = await axios.post(
        "https://api.shrigaar.com/api/v1/shrigar/Collections/products/create/api55",
        payload
      );

      if (res.data.success) {
        alert("✅ Project created successfully");
        setFormData(initialFormState);
        handleClose();
      } else {
        setError("Failed to create project");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating project"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create Project (Collection)</h3>

        <form onSubmit={handleSubmit}>
          {/* Collection Dropdown */}
          <select
            name="collectionId"
            className="modal-input"
            value={formData.collectionId}
            onChange={handleChange}
            required
          >
            <option value="">Select Collection</option>
            {collections.map((coll) => (
              <option key={coll._id} value={coll._id}>
                {coll.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            className="modal-input"
            value={formData.productName}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
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
            required
          />

          <input
            type="number"
            name="discountPercentage"
            placeholder="Discount (%)"
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

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="btn cancel"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn primary"
              disabled={loading || !formData.collectionId}
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCollProjectModal;
