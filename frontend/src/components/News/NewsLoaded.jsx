import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newsError, newsLoaded, newsLoading } from "../../redux/NewsSlice";
import axios from "axios";
import "./news.css";
const NewsLoaded = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state.news);
  const [newsArticle, setNewsArticle] = useState();

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
          ...fetchedResponse.data,
        ];
        setNewsArticle(allNews);
        dispatch(newsLoaded(allNews));
      } catch (err) {
        console.log(err);
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
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>{item.pubDate}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NewsLoaded;
