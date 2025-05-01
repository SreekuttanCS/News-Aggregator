import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsError, newsLoaded, newsLoading } from "../../redux/NewsSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import "./news.css";

const NewsLoaded = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.news);
  const { isLogged } = useSelector((state) => state.logged);

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(newsLoading());
      try {
        const fetchedResponse = await axios.get(
          "http://localhost:5000/api/news/fetchednews"
        );
        const userFetchedResponse = await axios.get(
          "http://localhost:5000/api/news/fetchnews"
        );
        console.log(userFetchedResponse.data.news);

        const allNews = [
          ...userFetchedResponse.data.news,
          ...fetchedResponse.data.articles,
        ];

        dispatch(newsLoaded(allNews));
      } catch (err) {
        dispatch(newsError("Failed to load news", err));
      }
    };

    fetchNews();
  }, [dispatch]);

  return (
    <div>
      {news ? (
        news.map((item, idx) => (
          <div key={idx} className="aa">
            <Link to={`/news/${item._id}`}>
              <h3 className="news-heading-load">{item.title}</h3>
            </Link>
            <p className="news-desc-load">{item.content}</p>
            <p className="news-desc-load truncate ">{item.description}</p>
            <p className="news-date-load">
              {item.publishedAt
                ? new Date(item.publishedAt).toLocaleString()
                : new Date(item.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsLoaded;
