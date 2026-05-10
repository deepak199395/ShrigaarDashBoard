import React from "react";

const CollectionProduct = ({ selected, onSelect }) => {
  return (
    <div
      className={`select-card collection-card ${selected ? "active" : ""}`}
      onClick={onSelect}
    >
      <h3>Product by Collections</h3>
      <p>Manage products using collections</p>
    </div>
  );
};

export default CollectionProduct;
