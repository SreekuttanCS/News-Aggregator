import React from "react";
import "../components/News/news.css";
import NewsLoaded from "../components/News/NewsLoaded";
import { useSelector } from "react-redux";
import CategoryNews from "../components/Category/CategoryNews";
import SearchNews from "../components/News/SearchNews";

const News = () => {
  const { category } = useSelector((state) => state.category);
  const { isSearch } = useSelector((state) => state.search);

  return (
    <div className="container news ">
      {isSearch ? (
        <SearchNews />
      ) : category == "All" ? (
        <NewsLoaded />
      ) : (
        <CategoryNews />
      )}
    </div>
  );
};

export default News;
