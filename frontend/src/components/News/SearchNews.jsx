import React, { useEffect } from "react";
import { newsError, newsLoading } from "../../redux/NewsSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addSearchNews } from "../../redux/SearchSlice";
import { Link } from "react-router-dom";

const SearchNews = () => {
  const dispatch = useDispatch();
  const { searchTerm, searchNews } = useSelector((state) => state.search);

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(newsLoading());
      try {
        const fetchedResponse = await axios.get(
          `http://localhost:5000/api/news/search/external?q=${searchTerm}`
        );
        const userFetchedResponse = await axios.get(
          `http://localhost:5000/api/news/search/user?q=${searchTerm}`
        );
        console.log("user fetched: ", userFetchedResponse);

        const allNews = [
          ...userFetchedResponse.data,
          ...fetchedResponse.data.articles,
        ];

        dispatch(addSearchNews(allNews));
      } catch (err) {
        dispatch(newsError("Failed to load news: " + err.message));
      }
    };

    fetchNews();
  }, [dispatch, searchTerm]);

  return (
    <div>
      {searchNews ? (
        searchNews.map((item, idx) => (
          <div key={idx} className="aa">
            <Link to={`/news/${item._id}`}>
              <h3 className="news-heading-load">{item.title}</h3>
            </Link>
            <p className="news-desc-load">{item.content}</p>
            <p className="news-desc-load">{item.description}</p>
            <p className="news-date-load">{item.publishedAt}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default SearchNews;
