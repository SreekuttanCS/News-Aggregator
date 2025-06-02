import React, { useEffect, useState } from "react";
import axios from "axios";
import UserIcon from "@mui/icons-material/Group";
import NewsIcon from "@mui/icons-material/Article";
import StatCard from "./StatCard";
import RecentUsers from "./RecentUsers";
import RecentNews from "./RecentNews";
import { endpoints } from "../../api/apiConfig";

const Dashboard = () => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(endpoints.adminDashboardFetch, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDatas(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg font-medium">
        Loading Dashboard...
      </div>
    );

  if (!datas)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Failed to load data.
      </div>
    );

  return (
    <div
      className="min-h-screen p-8 font-sans text-gray-200 max-w-5xl mx-auto"
      style={{ backgroundColor: "#292A2D" }}
    >
      <h1 className="text-3xl font-semibold mb-8 text-gray-100">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <StatCard
          icon={<UserIcon style={{ fontSize: 32, color: "#3b82f6" }} />}
          label="Total Users"
          value={datas.totalUser ?? 0}
          bgColor="#101828"
        />

        <StatCard
          icon={<NewsIcon style={{ fontSize: 32, color: "#10b981" }} />}
          label="News Uploads"
          value={datas.totalNews ?? 0}
          bgColor="#101828"
        />
      </div>

      <RecentUsers users={datas.recentUser} bgColor="#101828" />

      <RecentNews news={datas.recentNews} bgColor="#101828" />
    </div>
  );
};

export default Dashboard;
