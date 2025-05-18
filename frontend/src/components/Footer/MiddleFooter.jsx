import React from "react";

const MiddleFooter = () => {
  return (
    <div>
      <h2 className="text-white text-lg font-semibold mb-3">Menu</h2>
      <ul className="space-y-2 text-sm text-gray-400">
        <li className="hover:text-white cursor-pointer">About Us</li>
        <li className="hover:text-white cursor-pointer">Contact Us</li>
        <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
        <li className="hover:text-white cursor-pointer">Privacy Policy</li>
      </ul>
    </div>
  );
};

export default MiddleFooter;
