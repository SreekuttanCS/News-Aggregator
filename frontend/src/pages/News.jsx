import React, { lazy, Suspense } from "react";
import "../components/News/news.css";
import { useSelector } from "react-redux";

// Lazy-loaded components
const NewsLoaded = lazy(() => import("../components/News/NewsLoaded"));
const CategoryNews = lazy(() => import("../components/Category/CategoryNews"));
const SearchNews = lazy(() => import("../components/News/SearchNews"));

const News = () => {
  const { category } = useSelector((state) => state.category);
  const { isSearch } = useSelector((state) => state.search);

  return (
    <div className="container news">
      <Suspense fallback={<div>Loading news...</div>}>
        {isSearch ? (
          <SearchNews />
        ) : category === "All" ? (
          <NewsLoaded />
        ) : (
          <CategoryNews />
        )}
      </Suspense>
    </div>
  );
};

export default News;
