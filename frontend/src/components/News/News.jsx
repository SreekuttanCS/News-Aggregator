import React from "react";
import "./news.css";
import NewsLoaded from "./NewsLoaded";
import { useSelector } from "react-redux";
import CategoryNews from "../Category/CategoryNews";
import SearchNews from "./SearchNews";

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
