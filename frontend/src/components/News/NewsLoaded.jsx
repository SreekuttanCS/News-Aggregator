import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsError, newsLoaded, newsLoading } from "../../redux/NewsSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import "./news.css";
import { endpoints } from "../../api/apiConfig";

const NewsLoaded = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(newsLoading());
      try {
        const fetchedResponse = await axios.get(endpoints.loadFetchedResponse);
        const userFetchedResponse = await axios.get(
          endpoints.loadUserFetchedResponse
        );

        const allNews = [
          ...userFetchedResponse.data.news,
          ...fetchedResponse.data.articles,
        ];

        allNews.sort((a, b) => {
          const dateA = new Date(a.publishedAt || a.createdAt);
          const dateB = new Date(b.publishedAt || b.createdAt);
          return dateB - dateA;
        });

        dispatch(newsLoaded(allNews));
      } catch (err) {
        dispatch(newsError("Failed to load news", err));
      }
    };

    fetchNews();
  }, [dispatch]);

  return (
    <div className="container mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-6">
      {news && news.length > 0 ? (
        news.map((item, idx) => (
          <div
            key={idx}
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
              <Link to={`/news/${item._id}`} className="hover:underline">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {item.title}
                </h3>
              </Link>
              <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow line-clamp-3 mb-3">
                {item.description ||
                  item.content ||
                  "No description available."}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
                {item.publishedAt
                  ? new Date(item.publishedAt).toLocaleString()
                  : item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : "No date"}
              </p>
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

export default NewsLoaded;
