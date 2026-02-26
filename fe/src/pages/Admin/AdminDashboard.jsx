import React from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import OverviewPage from "./OverviewPage";
import RoomsPage from "./RoomsPage";
import UsersPage from "./UsersPage";
import SalesPage from "./SalesPage";
import OrdersPage from "./OrdersPage";
import AnalyticsPage from "./AnalyticsPage";
import SettingsPage from "./SettingsPage";
import Sidebar from "@/components/common_components/Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* BACKGROUND SETTINGS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      {/* Sidebar component */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 text-left">
        {" "}
        {/* Ensure space for Sidebar and left-align content */}
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
