import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminUserDetail = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.user);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchUser();
  }, []);

  const handleViewUser = (id) => {
    navigate(`/admin/user/${id}`);
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User deleted successfully.");
        navigate("/admin");
      } catch (err) {
        alert(
          err.response?.data?.message ||
            "Failed to delete user. Please try again."
        );
      }
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto mt-10 p-6 rounded-xl animate-fadeIn"
      style={{ backgroundColor: "#292A2D", color: "#E0E0E0" }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: "#fff" }}
      >
        Admin - User Details
      </h2>

      {Array.isArray(users) && users.length > 0 ? (
        <div className="overflow-x-auto" style={{ borderRadius: "8px" }}>
          <table
            className="min-w-full border-collapse table-auto"
            style={{ borderColor: "#3A3B3E" }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #3A3B3E" }}>
                {["Name", "Email", "Role", "Created At", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="p-3 text-left"
                      style={{
                        color: "#9CA3AF",
                        borderBottom: "2px solid #3A3B3E",
                      }}
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id || index}
                  className="transition duration-300 ease-in-out"
                  style={{ borderBottom: "1px solid #3A3B3E" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#3A3B3E")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleViewUser(user._id)}
                      className="px-3 py-1 rounded-md transition-all duration-300"
                      style={{
                        backgroundColor: "#3B82F6", // blue-500
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#2563EB")
                      } // blue-600
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#3B82F6")
                      }
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="px-3 py-1 rounded-md transition-all duration-300"
                      style={{
                        backgroundColor: "#EF4444", // red-500
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#DC2626")
                      } // red-600
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "#EF4444")
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-6" style={{ color: "#9CA3AF" }}>
          No users found.
        </p>
      )}
    </div>
  );
};

export default AdminUserDetail;
