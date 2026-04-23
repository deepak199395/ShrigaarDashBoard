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
import LoginWithEmail from "./pages/Auth/LoginWithEmail";
import LoginWithMobile from "./pages/Auth/LoginWithMobile";
import Orders from "./pages/Orders/Orders";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="app">

      <Sidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setSidebarOpen}  
        />
        <div className="main">

          <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

          <div className="content">
            <Routes>
               <Route path="/" element={<LoginWithMobile/>}/>
               <Route path="/dashboard" element={<MainDashBoard />} />
              <Route path="/create-staff" element={<CreateStaff />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/account" element={<Account />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/email-login" element={<LoginWithEmail/>}/>
              <Route path="/user-orders" element={<Orders/>}/>
            </Routes>
          </div>

        </div>
      </div>
    </Router>
  );
}

export default App;
