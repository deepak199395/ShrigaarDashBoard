import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExistingCollListModel.css";

const ExistingUnderBudgetListModel = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [underBudgetList, setUnderBudgetList] =
    useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ✅ Fetch Data
  useEffect(() => {
    if (isOpen) {
      fetchUnderBudgetList();
    }
  }, [isOpen]);

  const fetchUnderBudgetList = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "https://api.shrigaar.com/api/v1/shringar/underBudget/list/api79"
      );

      if (res.data.success) {
        setUnderBudgetList(res.data.data || []);
      } else {
        setError("Under Budget list not found");
      }
    } catch (err) {
      console.log(err);

      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Prevent render
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box existing-coll-modal">
        <h3>Existing Under Budget List</h3>

        {loading && (
          <p className="existing-coll-text">
            Loading data...
          </p>
        )}

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        {!loading &&
          underBudgetList.length === 0 && (
            <p className="existing-coll-text">
              No data found
            </p>
          )}

        <div className="existing-coll-list">
          {underBudgetList.map((item) => (
            <div
              key={item._id}
              className="existing-coll-item"
              onClick={() => {
                onSelect(item);
                onClose();
              }}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button
            className="btn cancel"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingUnderBudgetListModel;