import React from "react";
import Logo from "../Navbar/Logo";
import InputSection from "./InputSection";
import Account from "../Navbar/Account";

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className=" shadow-md p-4 flex items-center  justify-around  sticky top-0 z-50">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
        className="lg:hidden text-gray-700 focus:outline-none mr-3"
      >
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      <Logo />

      <Account />
    </header>
  );
};

export default AdminNavbar;
