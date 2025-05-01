import React from "react";
import "./news.css";
import NewsLoaded from "./NewsLoaded";
import { useSelector } from "react-redux";
import CategoryNews from "../Category/CategoryNews";
import SearchNews from "./SearchNews";
// import CreateNews from "../News Creation/CreateNews";
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
      {/* <CreateNews /> */}
    </div>
  );
};

export default News;
