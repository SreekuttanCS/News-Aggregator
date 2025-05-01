import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, setSearchTerm } from "../../redux/SearchSlice";
const InputBox = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { isSearch } = useSelector((state) => state.search);

  const handleSearch = () => {
    dispatch(setSearchTerm(search));
  };
  const handleClear = () => {
    dispatch(clearSearch());
    setSearch("");
  };
  return (
    <div className="flex gap-2 w-40 md:w-90">
      <input
        type="text"
        className="nav-input w-30 md:w-full text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {!isSearch ? (
        <button
          aria-label="Search"
          className="nav-search-button"
          onClick={handleSearch}
        >
          <SearchIcon className="nav-search-icon " fontSize="large" />
        </button>
      ) : (
        <button
          aria-label="Search"
          className="nav-search-button"
          onClick={handleClear}
        >
          <CloseIcon className="nav-search-icon " fontSize="large" />
        </button>
      )}
    </div>
  );
};

export default InputBox;
