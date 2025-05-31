// AdminNewsDetail.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import "./newsDetail.css";
import { deleteNews } from "./deleteNews";
import { newsError, newsLoaded, newsLoading } from "../../redux/NewsSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminNewsDetail = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { news } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(newsLoading());
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/news",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(newsLoaded(response.data.news || response.data));
      } catch (err) {
        dispatch(newsError("Error fetching dashboard data:", err));
      }
    };

    if (token) {
      fetchNews();
    }
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      await deleteNews(id, token, news, dispatch);
    }
  };

  return (
    <div className="container mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-6">
      {news && news.length > 0 ? (
        news.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {(item.urlToImage || item.image) && (
              <img
                src={item.urlToImage || item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/admin/news/${item._id}`} className="hover:underline">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {item.title}
                </h3>
              </Link>
              <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow line-clamp-3 mb-3">
                {item.description ||
                  item.content ||
                  "No description available."}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleString()
                    : item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "No date"}
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item._id)}
                >
                  <DeleteIcon fontSize="small" sx={{ color: "#E46962" }} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
          Loading...
        </p>
      )}
    </div>
  );
};

export default AdminNewsDetail;
