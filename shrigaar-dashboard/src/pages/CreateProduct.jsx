import React, { useState } from "react";
import "../Style/CreateProduct.css";
import CategoriesProduct from "./Categories/CategoriesProduct";
import CollectionProduct from "./Collections/CollectionProduct";
import CreateCategoryModal from "../components/modals/ProductModels/CreateCategoryModal";
import CreateCollectionModal from "../components/modals/ProductModels/CreateCollectionModal";
import CreateCollProjectModal from "../components/modals/ProductModels/CreateCollProjectModal";
import CreateCatProjectModal from "../components/modals/ProductModels/CreateCatProjectModal";
import ExistingCollListModel from "../components/modals/ProductModels/ExistingCollListModel";
import ExistingCatListModel from "../components/modals/ProductModels/ExistingCatListModel";

const CreateProduct = () => {
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [openCatProjectModal, setOpenCatProjectModal] = useState(false);
  const [openCollProjectModal, setOpenCollProjectModal] = useState(false);

  const [openExistingCollModal, setOpenExistingCollModal] = useState(false);
  const [openExistingCatModal, setOpenExistingCatModal] = useState(false);

  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const resetSubType = () => setSubType("");

  return (
    <div className="create-product-page">
      <h1>Create Product</h1>

      {/* STEP 1: MAIN SELECTION */}
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

            <div
              className={`select-card category-card ${
                subType === "existingCategory" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("existingCategory");
                setOpenExistingCatModal(true);
              }}
            >
              <h4>Existing Category List</h4>
              <p>Select from existing categories</p>
            </div>

            <div
              className={`select-card category-card ${
                subType === "createCatProject" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("createCatProject");
                setOpenCatProjectModal(true);
              }}
            >
              <h4>Create Project</h4>
              <p>Create project inside selected category</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: COLLECTION OPTIONS */}
      {type === "collection" && (
        <div className="sub-selection">
          <h3 className="collection-heading">Collection Options</h3>

          <div className="selection-grid small">
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

            <div
              className={`select-card collection-card ${
                subType === "existingCollection" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("existingCollection");
                setOpenExistingCollModal(true);
              }}
            >
              <h4>Existing Collection List</h4>
              <p>Select from existing collections</p>
            </div>

            <div
              className={`select-card collection-card ${
                subType === "createCollProject" ? "active" : ""
              }`}
              onClick={() => {
                setSubType("createCollProject");
                setOpenCollProjectModal(true);
              }}
            >
              <h4>Create Project</h4>
              <p>Create project inside selected collection</p>
            </div>
          </div>
        </div>
      )}

      {/* SELECTED INFO */}
      {type === "collection" && selectedCollection && (
        <div className="selected-info collection-info">
          <strong>Selected Collection:</strong> {selectedCollection.name}
        </div>
      )}

      {type === "category" && selectedCategory && (
        <div className="selected-info category-info">
          <strong>Selected Category:</strong> {selectedCategory.name}
        </div>
      )}

      {/* FLOW INFO */}
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

      <CreateCatProjectModal
        isOpen={openCatProjectModal}
        onClose={() => setOpenCatProjectModal(false)}
      />

      <CreateCollProjectModal
        isOpen={openCollProjectModal}
        onClose={() => setOpenCollProjectModal(false)}
      />

      <ExistingCollListModel
        isOpen={openExistingCollModal}
        onClose={() => setOpenExistingCollModal(false)}
        onSelect={(collection) => {
          setSelectedCollection(collection);
        }}
      />

      <ExistingCatListModel
        isOpen={openExistingCatModal}
        onClose={() => setOpenExistingCatModal(false)}
        onSelect={(category) => {
          setSelectedCategory(category);
        }}
      />
    </div>
  );
};

export default CreateProduct;
