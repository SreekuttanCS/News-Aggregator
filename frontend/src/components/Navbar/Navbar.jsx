import React from "react";
import "./navbar.css";
import Logo from "./Logo";
import InputBox from "./InputBox";
import Account from "./Account";

const Navbar = () => {
  return (
    <header className="shadow-md p-4 sticky top-0 z-50 ">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="flex-grow min-w-0 md:max-w-[500px]">
          <InputBox />
        </div>
        <div className="flex-shrink-0">
          <Account />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
