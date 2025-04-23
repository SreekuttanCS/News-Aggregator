import React from "react";
import "./navbar.css";
import Logo from "./Logo";
import InputBox from "./InputBox";
import Account from "./Account";

const Navbar = () => {
  return (
    <div className="navbar flex justify-around bg-amber-200 ">
      <Logo />
      <InputBox />
      <Account />
    </div>
  );
};

export default Navbar;
