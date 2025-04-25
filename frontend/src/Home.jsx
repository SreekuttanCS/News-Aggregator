import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Category from "./components/Category/Category";
import News from "./components/News/News";

const Home = () => {
  return (
    <>
      <Navbar />
      <Category />
      <News />
    </>
  );
};

export default Home;
