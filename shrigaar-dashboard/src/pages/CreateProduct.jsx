import React, { useState } from "react";
import "../Style/CreateProduct.css";

import CreateCategoryModal from "../components/modals/ProductModels/CreateCategoryModal";
import CreateCollectionModal from "../components/modals/ProductModels/CreateCollectionModal";

import CategoriesProduct from "./Categories/CategoriesProduct";
import CollectionProduct from "./Collections/CollectionProduct";

const CreateProduct = () => {
  const [type, setType] = useState(""); 
  const [subType, setSubType] = useState(""); 

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);

  const resetSubType = () => setSubType("");

  return (
    <div className="create-product-page">
      <h1>Create Product</h1>

      {/* STEP 1: Main selection */}
      <div className="selection-grid">
        <CollectionProduct
          selected={type === "collection"}
          onSelect={() => {
            setType("collection");
            resetSubType();
          }}
        />

        <CategoriesProduct
          selected={type === "category"}
          onSelect={() => {
            setType("category");
            resetSubType();
          }}
        />
      </div>

      {/* STEP 2: CATEGORY OPTIONS */}
      {type === "category" && (
        <div className="sub-selection">
          <h3 className="category-heading">Category Options</h3>

          <div className="selection-grid small">
            {/* Create New Category */}
            <div
              className={`select-card category-card ${
                subType === "newCategory" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("newCategory");
                setOpenCategoryModal(true);
              }}
            >
              <h4>Create New Category</h4>
              <p>Add a new category</p>
            </div>

            {/* Existing Category List */}
            <div
              className={`select-card category-card ${
                subType === "existingCategory" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("existingCategory");
              }}
            >
              <h4>Existing Category List</h4>
              <p>Select from existing categories</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: COLLECTION OPTIONS */}
      {type === "collection" && (
        <div className="sub-selection">
          <h3 className="collection-heading">Collection Options</h3>

          <div className="selection-grid small">
            {/* Create New Collection */}
            <div
              className={`select-card collection-card ${
                subType === "newCollection" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("newCollection");
                setOpenCollectionModal(true);
              }}
            >
              <h4>Create New Collection</h4>
              <p>Add a new collection</p>
            </div>

            {/* Existing Collection List */}
            <div
              className={`select-card collection-card ${
                subType === "existingCollection" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("existingCollection");
              }}
            >
              <h4>Existing Collection List</h4>
              <p>Select from existing collections</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Selected info */}
      {(type || subType) && (
        <div
          className={`selected-info ${
            type === "category" ? "category-info" : "collection-info"
          }`}
        >
          <strong>Selected Flow:</strong>{" "}
          {type === "category" && "Create Product by Category"}
          {type === "collection" && "Create Product by Collection"}
          {subType && ` → ${subType}`}
        </div>
      )}

      {/* MODALS */}
      <CreateCategoryModal
        isOpen={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
      />

      <CreateCollectionModal
        isOpen={openCollectionModal}
        onClose={() => setOpenCollectionModal(false)}
      />
    </div>
  );
};

export default CreateProduct;
