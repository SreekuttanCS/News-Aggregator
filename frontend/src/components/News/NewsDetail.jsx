import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const NewsDetail = ({ userCreatedNews }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const userNews = userCreatedNews.find((item) => item._id === id);
        if (userNews) {
          setNewsItem(userNews);
        } else {
          const response = await axios.get(
            `http://localhost:5000/api/news/${id}`
          );
          setNewsItem(response.data);
        }
      } catch (err) {
        console.log("Error fetching news detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id, userCreatedNews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">News item not found.</p>
      </div>
    );
  }
  console.log("new detail");

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        &larr; Back
      </button>

      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">
        {newsItem.title}
      </h1>

      {newsItem.pubDate && (
        <p className="text-sm text-gray-500 mb-6">
          Published on: {new Date(newsItem.pubDate).toLocaleDateString()}
        </p>
      )}

      {newsItem.image && (
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8 shadow-lg"
        />
      )}

      <div className="prose max-w-none text-gray-700 whitespace-pre-line">
        <p>{newsItem.content || newsItem.description}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
