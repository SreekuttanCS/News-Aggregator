import React from "react";
import "./news.css";
import NewsLoaded from "./NewsLoaded";
import { useSelector } from "react-redux";
import CategoryNews from "../Category/CategoryNews";
const News = () => {
  const { category } = useSelector((state) => state.category);
  console.log("vat " + category);

  return (
    <div className="container news ">
      {category == "All" ? <NewsLoaded /> : <CategoryNews />}
    </div>
  );
};

export default News;
