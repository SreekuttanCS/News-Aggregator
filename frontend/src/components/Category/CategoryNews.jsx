import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsError, newsLoaded, newsLoading } from "../../redux/NewsSlice";
import axios from "axios";
import { Link } from "react-router-dom";
import "../News/news.css";

const CategoryNews = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.news);
  const { isLogged } = useSelector((state) => state.logged);
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    const fetchNews = async () => {
      dispatch(newsLoading());

      try {
        const fetchedResponse = await axios.get(
          `http://localhost:5000/api/news/category/${category}`
        );
        const userFetchedResponse = await axios.get(
          `http://localhost:5000/api/news/category_user/${category}`
        );

        const userNews = Array.isArray(userFetchedResponse.data)
          ? userFetchedResponse.data
          : Array.isArray(userFetchedResponse.data.articles)
          ? userFetchedResponse.data.articles
          : [];

        const apiNews = Array.isArray(fetchedResponse.data.articles)
          ? fetchedResponse.data.articles
          : [];

        const allNews = [...userNews, ...apiNews];
        dispatch(newsLoaded(allNews));
      } catch (err) {
        console.log(err);
        dispatch(newsError("Failed to load news", err));
      }
    };

    fetchNews();
  }, [category]);
  return (
    <div>
      {news ? (
        news.map((item, idx) => (
          <div key={idx} className="aa">
            <Link to={`/news/${item._id}`}>
              <h3 className="news-heading-load">{item.title}</h3>
            </Link>
            <p className="news-desc-load">{item.content || item.description}</p>
            <p className="news-desc-load">{item.description}</p>
            <p className="news-date-load">{item.pubDate}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CategoryNews;
