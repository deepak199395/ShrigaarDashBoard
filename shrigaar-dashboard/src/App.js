import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import MainDashBoard from "./pages/MainDashBoard";
import CreateStaff from "./pages/CreateStaff";
import CreateProduct from "./pages/CreateProduct";
import Account from "./pages/Account/Account";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

import "./App.css";
import Sales from "./pages/Sales/Sales";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app">

        {/* 🔹 Sidebar always visible */}
        <Sidebar isOpen={isSidebarOpen} />

        <div className="main">

          {/* 🔹 Navbar always visible */}
          <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

          {/* 🔹 Only this part changes */}
          <div className="content">
            <Routes>
              <Route path="/" element={<MainDashBoard />} />
              <Route path="/create-staff" element={<CreateStaff />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/account" element={<Account />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
