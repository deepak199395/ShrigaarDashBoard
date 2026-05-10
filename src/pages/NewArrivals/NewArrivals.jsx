import React from 'react'

const NewArrivals = ({ selected, onSelect }) => {
  return (
    <div
    className={`select-card category-card ${selected ? "active" : ""}`}
      onClick={onSelect}
    >
      <h3>Create Product by NewArrivals</h3>
      <p>Manage products using NewArrivals</p>
    </div>
  )
}

export default NewArrivals
