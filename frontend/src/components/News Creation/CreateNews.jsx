import React from "react";
import Creation from "./Creation";
import Navbar from "../Navbar/Navbar";
import Category from "../Category/Category";

const CreateNews = () => {
  return (
    <>
      <Navbar />
      <Category />
      <div className="container ">
        <Creation />
      </div>
    </>
  );
};

export default CreateNews;
