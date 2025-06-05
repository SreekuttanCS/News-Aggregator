// src/components/News/IndividualNews.jsx

import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Seo from "../Seo/Seo";
import { API_BASE_URL } from "../../api/apiConfig";

const IndividualNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { news } = useSelector((state) => state.news);

  // Decode id to match articles using url if needed
  const decodedId = decodeURIComponent(id);

  const individualNews = news.find((item) => {
    return item._id === decodedId || item.url === decodedId;
  });

  if (!individualNews) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl">
        News article not found.
      </div>
    );
  }

  const formattedDate = new Date(
    individualNews.publishedAt || individualNews.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imageUrl =
    individualNews.image?.startsWith("http") ||
    individualNews.urlToImage?.startsWith("http")
      ? individualNews.image || individualNews.urlToImage
      : `${API_BASE_URL.replace("/api", "")}/${individualNews.image}`;

  const seoTitle = individualNews.title;
  const seoDescription =
    individualNews.description ||
    individualNews.content?.slice(0, 150) ||
    "News article from India News Aggregator";
  const seoUrl = `${window.location.origin}/news/${id}`;

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} url={seoUrl} />
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
            <strong>Category:</strong> {individualNews.category || "General"}
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
      </div>
    </>
  );
};

export default IndividualNews;
