import React, { useEffect, useState } from "react";

const AdminUserDetail = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response;
        console.log("sdsd" + response);
        setUser(data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        User Details
      </h2>
    </div>
  );
};

export default AdminUserDetail;
