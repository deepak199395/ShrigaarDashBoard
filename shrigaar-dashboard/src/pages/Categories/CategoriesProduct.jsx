import React from "react";

const CategoriesProduct = ({ selected, onSelect }) => {
  return (
    <div
      className={`select-card category-card ${selected ? "active" : ""}`}
      onClick={onSelect}
    >
      <h3>Create Product by Categories</h3>
      <p>Manage products using categories</p>
    </div>
  );
};

export default CategoriesProduct;
