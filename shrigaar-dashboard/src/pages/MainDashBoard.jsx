import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../Style/MainDashBoard.css"
const MainDashBoard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <div className="app">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="main">
            <Navbar toggleSidebar={()=>setIsSidebarOpen(!isSidebarOpen)}/>
                <div className="content">
                 <h1>Welcome 👋</h1>
                 <p>Select an option from the sidebar</p>

                </div>
            </div>
        </div>
    )
}

export default MainDashBoard
