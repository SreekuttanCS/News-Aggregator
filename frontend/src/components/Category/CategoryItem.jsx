import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/CategorySlice";

const CategoryItem = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.category);

  const items = [
    "All",
    "World",
    "Nation",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
    "Health",
  ];

  const handleCategory = (item) => {
    dispatch(setCategory(item));
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => handleCategory(item)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ease-in-out
            ${
              selectedCategory === item
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-blue-500 hover:text-white"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CategoryItem;
