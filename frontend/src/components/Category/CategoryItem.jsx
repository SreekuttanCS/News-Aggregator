import React from "react";

const CategoryItem = () => {
  const items = [
    "Home",
    "World",
    "Nation",
    "Business",
    "Technology",
    "Entertainment",
    "Sports",
    "Science",
    "Health",
  ];
  return (
    <div className="flex flex-wrap gap-3 justify-around">
      {items.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

export default CategoryItem;
