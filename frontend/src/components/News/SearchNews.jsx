import React, { useEffect } from "react";
import { newsError, newsLoading } from "../../redux/NewsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addSearchNews } from "../../redux/SearchSlice";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { endpoints } from "../../api/apiConfig";

const SearchNews = () => {
  const dispatch = useDispatch();
  const { searchTerm, searchNews } = useSelector((state) => state.search);

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(newsLoading());
      if (searchTerm) {
        try {
          const fetchedResponse = await axios.get(
            endpoints.searchExternalNews(searchTerm)
          );
          const userFetchedResponse = await axios.get(
            endpoints.searchUserNews(searchTerm)
          );

          const allNews = [
            ...userFetchedResponse.data,
            ...fetchedResponse.data.articles,
          ];

          dispatch(addSearchNews(allNews));
        } catch (err) {
          dispatch(newsError("Failed to load news: " + err.message));
          toast.error("Failed to load news. Please try again later.", {
            position: "top-left",
            autoClose: 3000,
            theme: "dark",
            transition: Bounce,
          });
        }
      } else {
        toast.warn("Enter Search Term", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    };
    fetchNews();
  }, [searchTerm, dispatch]);

  return (
    <div className="container mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 py-6">
      {searchNews && searchNews.length > 0 ? (
        searchNews.map((item, idx) => (
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

export default SearchNews;
