import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setDatas(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="dashboard flex flex-wrap justify-center item-center">
      <div className="dashboard-box">
        <span className="dashboard-heading">Total User</span>
        <span className="dashboard-value block">
          {datas?.totalUser ?? "Loading..."}
        </span>
      </div>
      <div className="dashboard-box">
        <span className="dashboard-heading">Total User Upload News</span>
        <span className="dashboard-value block">
          {datas?.totalNews ?? "Loading..."}
        </span>
      </div>
      <div className="dashboard-box">
        <span className="dashboard-heading"> Recent 5 Users</span>

        {datas?.recentUser.map((data) => (
          <span className="dashboard-value block">{data.name}</span>
        )) ?? "Loading..."}
      </div>
      <div className="dashboard-box">
        <span className="dashboard-heading"> Recent 5 News</span>

        {datas?.recentNews.map((data) => (
          <span className="dashboard-value block text-center">
            {data.title}
          </span>
        )) ?? "Loading..."}
      </div>
    </div>
  );
};

export default Dashboard;
