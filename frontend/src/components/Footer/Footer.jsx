import React from "react";
import LeftFooter from "./LeftFooter";
import MiddleFooter from "./MiddleFooter";
import RightFooter from "./RightFooter";
import Term from "./Term";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-300 px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <LeftFooter />
        <MiddleFooter />
        <RightFooter />
      </div>
      <hr className="my-6 border-gray-700" />
      <Term />
    </footer>
  );
};

export default Footer;
