import React from "react";

const RightFooter = () => {
  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-3">Category</h2>
      <ul className="space-y-2 text-sm text-gray-400">
        <li className="hover:text-white cursor-pointer">All</li>
        <li className="hover:text-white cursor-pointer">World</li>
        <li className="hover:text-white cursor-pointer">Nation</li>
        <li className="hover:text-white cursor-pointer">Business</li>
      </ul>
    </div>
  );
};

export default RightFooter;
