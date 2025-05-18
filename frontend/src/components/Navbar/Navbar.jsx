import React from "react";
import "./navbar.css";
import Logo from "./Logo";
import InputBox from "./InputBox";
import Account from "./Account";

const Navbar = () => {
  return (
    <header className=" shadow-md p-5 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Logo />
        <InputBox />
        <Account />
    </div>
    </header>
  );
};


export default Navbar;
