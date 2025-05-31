import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { deleteNews } from "./deleteNews";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminIndividualNews = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { news } = useSelector((state) => state.news);

  const individualNews = news.find((item) => item._id === id);

  if (!individualNews) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl">
        News article not found.
      </div>
    );
  }
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      await deleteNews(id, token, news, dispatch);
    }
    navigate("/admin");
  };
  const formattedDate = new Date(individualNews.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  const imageUrl =
    individualNews.image?.startsWith("http") ||
    individualNews.urlToImage?.startsWith("http")
      ? individualNews.image || individualNews.urlToImage
      : `http://localhost:5000/${individualNews.image}`;

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        &larr; Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-gray-50">
        {individualNews.title}
      </h1>

      <div className="flex flex-wrap gap-4 text-gray-500 mb-6">
        <p>
          <strong>Category:</strong> {individualNews.category}
        </p>
        <p>
          <strong>Date:</strong> {formattedDate}
        </p>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={individualNews.title}
          className="w-full max-h-96 object-cover rounded-lg mb-8 shadow-md"
        />
      )}

      <p className="text-white leading-relaxed whitespace-pre-line">
        {individualNews.content}
      </p>
      <button
        className="  w-50 p-1 mt-3 rounded-2xl bg-red-800"
        onClick={() => handleDelete(individualNews._id)}
      >
        <span className="flex justify-center items-center gap-2">
          <h3>Delete</h3>
          <DeleteIcon
            fontSize="small"
            sx={{ color: "#E46962" }}
            className="delete-button"
          />
        </span>
      </button>
    </div>
  );
};

export default AdminIndividualNews;
