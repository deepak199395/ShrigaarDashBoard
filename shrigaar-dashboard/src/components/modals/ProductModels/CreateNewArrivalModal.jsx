import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

const CreateNewArrivalModal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([""]);
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // 🔥 Handle image change
  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  // 🔥 Add image
  const addImageField = () => {
    if (images.length < 6) {
      setImages([...images, ""]);
    }
  };

  // 🔥 Remove image
  const removeImageField = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  // 🔥 Submit
  const handleSubmit = async () => {
    const filteredImages = images.filter((img) => img.trim() !== "");

    if (
      !productName ||
      filteredImages.length === 0 ||
      !description ||
      !originalPrice ||
      !discountPercentage
    ) {
      alert("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://www.shrigaar.com/api/v1/shringar/createNewArrival/api71",
        {
          productName,
          images: filteredImages,
          description,
          originalPrice: Number(originalPrice),
          discountPercentage: Number(discountPercentage),
          inStock: true,
        }
      );

      if (response.data.success) {
        alert("New Arrival created successfully ✅");

        // Reset
        setProductName("");
        setImages([""]);
        setDescription("");
        setOriginalPrice("");
        setDiscountPercentage("");

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
        <h3>Create New Arrival</h3>

        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="modal-input"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        {/* 🔥 Dynamic Image Section */}
        <div className="image-section">
          <label>Product Images</label>

          {images.map((img, index) => (
            <div key={index} className="image-row">
              <input
                type="text"
                placeholder={`Image URL ${index + 1}`}
                className="modal-input"
                value={img}
                onChange={(e) =>
                  handleImageChange(index, e.target.value)
                }
              />

              {images.length > 1 && (
                <button
                  className="remove-btn"
                  onClick={() => removeImageField(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}

          {images.length < 6 && (
            <button className="add-btn" onClick={addImageField}>
              + Add Image
            </button>
          )}
        </div>

        {/* Description */}
        <input
          type="text"
          placeholder="Description"
          className="modal-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Original Price"
          className="modal-input"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
        />

        {/* Discount */}
        <input
          type="number"
          placeholder="Discount %"
          className="modal-input"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
        />

        {/* Buttons */}
        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save New Arrival"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewArrivalModal;