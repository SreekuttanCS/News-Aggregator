// src/components/Seo.jsx
import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({
  title = "News Aggregator | Latest News and Headlines",
  description = "Stay updated with the latest news and top headlines from India, covering politics, sports, technology, and more.",
  keywords = "India news, latest news India, breaking news, Indian politics, sports news India, technology news India",
  author = "India News Team",
  url = "",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

export default Seo;
