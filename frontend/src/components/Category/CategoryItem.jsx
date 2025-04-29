import React from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../redux/CategorySlice";

const CategoryItem = () => {
  const dispatch = useDispatch();

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
    <div className="flex flex-wrap gap-3 justify-around">
      {items.map((item) => (
        <div key={item} onClick={() => handleCategory(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default CategoryItem;
