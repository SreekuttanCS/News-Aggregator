import React from "react";
import Dashboard from "../AdminDashboard/Dashboard";
import AdminUserDetail from "../AdminUserDetail/AdminUserDetail";
import AdminNewsDetail from "../AdminNewsDetail/AdminNewsDetail";

const AdminContent = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "users":
        return <AdminUserDetail />;
      case "news":
        return <AdminNewsDetail />;
      default:
        return <Dashboard />;
    }
  };

  return <div className="min-h-full">{renderContent()}</div>;
};

export default AdminContent;
