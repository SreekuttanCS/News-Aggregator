import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, setSearchTerm } from "../../redux/SearchSlice";

const InputBox = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { isSearch } = useSelector((state) => state.search);

  const handleSearch = () => {
    if (search.trim()) {
      dispatch(setSearchTerm(search));
    }
  };

  const handleClear = () => {
    dispatch(clearSearch());
    setSearch("");
  };

  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg shadow-sm w-full md:w-96">
      <input
        type="text"
        placeholder="Search news..."
        className="flex-grow bg-transparent outline-none text-black placeholder-gray-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={isSearch ? handleClear : handleSearch}>
        {isSearch ? (
          <CloseIcon className="text-red-500" />
        ) : (
          <SearchIcon className="text-blue-500" />
        )}
      </button>
    </div>
  );
};

export default InputBox;
