import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Category from "./components/Category/Category";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDetail from "./components/News/NewsDetail";
import CreateNews from "./components/News Creation/CreateNews";

const Home = () => {
  return (
    <>
      <Navbar />
      <Category />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/news/create" element={<CreateNews />} />
      </Routes>
    </>
  );
};

export default Home;
