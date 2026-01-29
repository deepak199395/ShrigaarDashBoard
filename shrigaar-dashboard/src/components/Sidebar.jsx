import React from 'react'
import "./Sidebar.css";
import { Link } from "react-router-dom";


const Sidebar = ({isOpen}) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="logo">My Dashboard</h2>
      <ul>
         <li><Link to="/create-staff">Create Staff</Link></li>
        <li><Link to="/create-product">Create Product</Link></li>
        <li><Link to="/account">Account</Link></li>
        <li><Link to="/sales">Sales</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar
