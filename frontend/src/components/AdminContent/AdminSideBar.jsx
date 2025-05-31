import React from "react";

const AdminSideBar = ({
  onSelect,
  activeSection,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "users", label: "Users" },
    { key: "news", label: "News" },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      ></div>

      <aside
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white w-56 p-6 z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:flex-shrink-0
          flex flex-col
        `}
      >
        <h2 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h2>
        <nav>
          <ul className="space-y-4">
            {menuItems.map(({ key, label }) => (
              <li
                key={key}
                onClick={() => {
                  onSelect(key);
                  setSidebarOpen(false);
                }}
                className={`cursor-pointer rounded px-3 py-2 hover:bg-gray-700 transition-colors
                  ${
                    activeSection === key
                      ? "bg-gray-700 font-semibold shadow-lg"
                      : ""
                  }
                `}
              >
                {label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminSideBar;
