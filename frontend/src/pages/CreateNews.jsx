  import React from "react";
  import Creation from "../components/News Creation/Creation";
  import Navbar from "../components/Navbar/Navbar";
  import Category from "../components/Category/Category";

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
