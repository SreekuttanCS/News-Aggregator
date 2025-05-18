import React from "react";
import Dashboard from "../AdminDashboard/Dashboard";
import AdminUserDetail from "../AdminUserDetail/AdminUserDetail";

const AdminContent = () => {
  return (
    <div className="  h-content lg:h-screen">
      <Dashboard />
      <AdminUserDetail />
    </div>
  );
};

export default AdminContent;
