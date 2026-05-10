import React from 'react'
import "./Underbudget.css"
const Underbudget = ({ selected, onSelect }) => {
  return (
   <div
      className={`select-card collection-card ${selected ? "active" : ""}`}
      onClick={onSelect}
    >
      <h3>Product by Under Budget</h3>
      <p>Manage products using Under Budget</p>
    </div>
  )
}

export default Underbudget
