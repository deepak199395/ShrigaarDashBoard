import React from 'react'

const Navbar = ({toggleSidebar}) => {
  return (
    <div className="navbar">
      <button className='menu-btn' onClick={toggleSidebar}>
      ☰
      </button>
    </div>
  )
}

export default Navbar
