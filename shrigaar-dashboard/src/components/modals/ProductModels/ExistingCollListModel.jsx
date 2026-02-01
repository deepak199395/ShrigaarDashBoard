import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExistingCollListModel.css";

const ExistingCollListModel = ({ isOpen, onClose, onSelect }) => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Hook is ALWAYS called
  useEffect(() => {
    if (isOpen) {
      fetchCollections();
    }
  }, [isOpen]);

  const fetchCollections = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        "https://devdeepak-backend-api-fbdhhyeddwbab9da.centralindia-01.azurewebsites.net/api/v1/shrigar/collections/list/api52"
      );

      if (res.data.success && res.data.flage === "Y") {
        setCollections(res.data.collection || []);
      } else {
        setError("Collections not available");
      }
    } catch (err) {
      setError("Failed to load collections");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Conditional render AFTER hooks
  if (!isOpen) return null;

  return (
   <div className="modal-overlay">
  <div className="modal-box existing-coll-modal">
    <h3>Existing Collections</h3>

    {loading && (
      <p className="existing-coll-text">Loading collections...</p>
    )}

    {error && <p className="error-text">{error}</p>}

    {!loading && collections.length === 0 && (
      <p className="existing-coll-text">No collections found</p>
    )}

    <div className="existing-coll-list">
      {collections.map((item) => (
        <div
          key={item._id}
          className="existing-coll-item"
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

export default ExistingCollListModel;
