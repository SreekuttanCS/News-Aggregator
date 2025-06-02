import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../api/apiConfig";

const IndividualUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetail = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(endpoints.getUserById(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmed) return;

    const token = localStorage.getItem("token");

    try {
      await axios.delete(endpoints.deleteUserById(userId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User deleted successfully.");
      navigate("/admin");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to delete user. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-200">
        Loading user details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p>{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-800 text-white rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-3xl font-bold mb-4 text-center">User Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-gray-400 text-sm">Name</p>
          <p className="text-lg">{user.name}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-lg">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Role</p>
          <p className="capitalize text-lg">{user.role}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Created At</p>
          <p className="text-lg">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-300"
        >
          Back
        </button>
        <button
          onClick={() => handleDelete(user._id)}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-all duration-300"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default IndividualUser;
