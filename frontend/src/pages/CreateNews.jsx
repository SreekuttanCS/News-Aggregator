import React from "react";
import Creation from "../components/News Creation/Creation";
import Navbar from "../components/Navbar/Navbar";
import Category from "../components/Category/Category";
import Seo from "../components/Seo/Seo";

const CreateNews = () => {
  return (
    <>
      <Seo
        title="Create News | News Aggregator"
        description="Submit and publish your news articles on India News Aggregator."
        url="https://yourdomain.com/news/create"
      />
      <Navbar />
      <Category />
      <div className="container">
        <Creation />
      </div>
    </>
  );
};

export default CreateNews;
