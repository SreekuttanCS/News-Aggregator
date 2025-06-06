import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="text-xl md:text-2xl font-bold text-white  transition-colors duration-300">
      <Link to="/">NewsGrid</Link>
    </div>
  );
};

export default Logo;
