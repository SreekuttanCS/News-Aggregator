import React, { lazy, Suspense } from "react";
import "../components/News/news.css";
import { useSelector } from "react-redux";
import Seo from "../components/Seo/Seo";

const NewsLoaded = lazy(() => import("../components/News/NewsLoaded"));
const CategoryNews = lazy(() => import("../components/Category/CategoryNews"));
const SearchNews = lazy(() => import("../components/News/SearchNews"));

const News = () => {
  const { category } = useSelector((state) => state.category);
  const { isSearch, searchTerm } = useSelector((state) => state.search);

  const title = isSearch
    ? `Search results for "${searchTerm}" | India News Aggregator`
    : category && category !== "All"
    ? `${category} News | India News Aggregator`
    : "Latest News | India News Aggregator";

  const description = isSearch
    ? `Showing search results for "${searchTerm}". Stay updated with the latest news matching your query.`
    : category && category !== "All"
    ? `Stay updated with the latest news and headlines in ${category}.`
    : "Stay updated with the latest news and top headlines from India.";

  return (
    <>
      <Seo title={title} description={description} />

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
    </>
  );
};

export default News;
