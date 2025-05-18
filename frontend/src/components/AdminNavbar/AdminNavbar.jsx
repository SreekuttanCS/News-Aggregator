import React from "react";
import Logo from "../Navbar/Logo.jsx";
import InputSection from "./InputSection.jsx";
import Account from "../Navbar/Account.jsx";
const AdminNavbar = () => {
  return (
    <div className="navbar flex justify-around">
      <Logo />
      <InputSection />
      <Account />
    </div>
  );
};

export default AdminNavbar;
