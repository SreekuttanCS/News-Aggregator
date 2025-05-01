import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Category from "./components/Category/Category";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewsDetail from "./components/News/NewsDetail";
import CreateNews from "./components/News Creation/CreateNews";
import { useSelector } from "react-redux";

const Home = () => {
  const { isPost  } = useSelector((state) => state.logged);

  return (
    <>
      <Navbar />
      <Category />
      <Routes>
       
        {isPost ? (
          <Route path="/news/create" element={<CreateNews />} />
        ) : (
          <Route path="/" element={<News />} />
        )}
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
    </>
  );
};

export default Home;
