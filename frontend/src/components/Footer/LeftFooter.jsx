import React from "react";

const Logo = () => (
  <h1 className="text-white text-2xl font-semibold italic">NewsGrid</h1>
);

const LeftFooter = () => {
  return (
    <div>
      <Logo />
      <p className="mt-4 text-sm text-gray-400">
        Stay informed with the latest updates across the globe.
      </p>
    </div>
  );
};

export default LeftFooter;
