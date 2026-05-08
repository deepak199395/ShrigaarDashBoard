import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";

const CreateUnderBudgetModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // 🔥 Submit
  const handleSubmit = async () => {
    if (!title || !image || !amount) {
      alert("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      // 🔥 API REQUEST
      const response = await axios.post(
        "https://api.shrigaar.com/api/v1/shringar/underBudget/create/api78",
        {
          title,
          amount: Number(amount),
          image,
        }
      );

      // 🔥 API RESPONSE
      console.log("API RESPONSE:", response.data);

      if (response.data.success) {
        alert(response.data.message);

        // Reset Fields
        setTitle("");
        setImage("");
        setAmount("");

        onClose();
      }
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Create Under Budget</h3>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          className="modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Image */}
        <input
          type="text"
          placeholder="Image URL"
          className="modal-input"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          className="modal-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Buttons */}
        <div className="modal-actions">
          <button
            className="btn cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Under Budget"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUnderBudgetModal;