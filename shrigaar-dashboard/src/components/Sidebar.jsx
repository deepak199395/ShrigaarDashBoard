import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      
      {/* Header */}
      <div className="sidebar-header">
        <h2 className="logo">Shrigaar</h2>

        {/* Close Button */}
        <button 
          className="close-btn" 
          onClick={() => setIsOpen(false)}
        >
          ✖
        </button>
      </div>

      <ul>
        <li><Link to="/create-staff" onClick={() => setIsOpen(false)}>Create Staff</Link></li>
        <li><Link to="/create-product" onClick={() => setIsOpen(false)}>Create Product</Link></li>
        <li><Link to="/account" onClick={() => setIsOpen(false)}>Account</Link></li>
        <li><Link to="/sales" onClick={() => setIsOpen(false)}>Sales</Link></li>
        <li><Link to="/analytics" onClick={() => setIsOpen(false)}>Analytics</Link></li>
        <li><Link to="/settings" onClick={() => setIsOpen(false)}>Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
