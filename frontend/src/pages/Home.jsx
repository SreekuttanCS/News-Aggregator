import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Category from "../components/Category/Category";
import News from "./News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateNews from "./CreateNews";
import { useSelector } from "react-redux";
import MarqueeSection from "../components/Marquee/MarqueeSection";
import Footer from "../components/Footer/Footer";
import IndividualNews from "../components/News/IndividualNews";

const Home = () => {
  const { isPost } = useSelector((state) => state.logged);

  return (
    <>
      <Navbar />
      <Category />
      <MarqueeSection />
      <Routes>
        {isPost ? (
          <Route path="/news/create" element={<CreateNews />} />
        ) : (
          <Route path="/" element={<News />} />
        )}
        <Route path="/news/:id" element={<IndividualNews />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Home;
