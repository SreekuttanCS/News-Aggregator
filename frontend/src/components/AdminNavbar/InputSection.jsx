import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const InputSection = () => {
  return (
    <div>
      <input type="text" className="nav-input  text-black" />
      <button
        aria-label="Search"
        className="nav-search-button"
        //   onClick={handleSearch}
      >
        <SearchIcon className="nav-search-icon " fontSize="large" />
      </button>

      {/* <button
          aria-label="Search"
          className="nav-search-button"
        //   onClick={handleClear}
        >
          <CloseIcon className="nav-search-icon " fontSize="large" />
        </button> */}
    </div>
  );
};

export default InputSection;
