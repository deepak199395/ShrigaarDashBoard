import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";
import "./ExistingCatListModel.css";

const ExistingCatListModel = ({ isOpen, onClose, onSelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Always call hook
  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "https://devdeepak-backend-api-fbdhhyeddwbab9da.centralindia-01.azurewebsites.net/api/v1/shrigar/categories/list/apiXX"
        // 🔴 replace apiXX with your actual category list endpoint
      );

      if (res.data.success && res.data.flage === "Y") {
        setCategories(res.data.category || []);
      } else {
        setError("Categories not available");
      }
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box existing-cat-modal">
        <h3>Existing Categories</h3>

        {loading && (
          <p className="existing-cat-text">Loading categories...</p>
        )}

        {error && <p className="error-text">{error}</p>}

        {!loading && categories.length === 0 && (
          <p className="existing-cat-text">No categories found</p>
        )}

        <div className="existing-cat-list">
          {categories.map((item) => (
            <div
              key={item._id}
              className="existing-cat-item"
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              {item.name}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingCatListModel;
