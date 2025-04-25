import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./navbar.css";
const InputBox = () => {
  return (
    <div className="flex gap-2 w-40 md:w-90">
      <input type="text" className="nav-input w-30 md:w-full text-black" />
      <button aria-label="Search" className="nav-search-button">
        <SearchIcon className="nav-search-icon " fontSize="large" />
      </button>
    </div>
  );
};

export default InputBox;
