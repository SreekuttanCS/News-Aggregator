import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./news.css";

const NewsDetail = ({ userCreatedNews }) => {
  const { id } = useParams();  // Get the news article `id` from the URL
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch news by ID
    const fetchNewsDetail = async () => {
      try {
        let response;

        // Check if the article exists in the user-created news first
        const userNews = userCreatedNews.find((item) => item._id === id);
        
        if (userNews) {
          // If the news article is from user-generated content
          setNewsItem(userNews);
          setLoading(false);
        } else {
          // If it's not user-created, fetch from the backend (API-based)
          response = await axios.get(
            `http://localhost:5000/api/news/${id}` // API endpoint to fetch the article by ID
          );
          setNewsItem(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log("Error fetching news detail:", err);
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id, userCreatedNews]);  // Re-run the effect if ID or user-created news changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="news-detail">
      {newsItem ? (
        <>
          <h1 className="news-heading-load">{newsItem.title}</h1>
          <p className="news-date-load">{newsItem.pubDate}</p>
          <div className="news-content-load">
            <p>{newsItem.content || newsItem.description}</p>
          </div>
        </>
      ) : (
        <p>News item not found.</p>
      )}
    </div>
  );
};

export default NewsDetail;
