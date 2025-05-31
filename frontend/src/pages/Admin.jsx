import React, { useState, lazy, Suspense } from "react";

const AdminNavbar = lazy(() => import("../components/AdminNavbar/AdminNavbar"));
const AdminSideBar = lazy(() =>
  import("../components/AdminContent/AdminSideBar")
);
const AdminContent = lazy(() =>
  import("../components/AdminContent/AdminContent")
);

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <AdminNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </Suspense>

      <div className="flex flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <AdminSideBar
            onSelect={setActiveSection}
            activeSection={activeSection}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </Suspense>

        <main className="flex-1 overflow-y-auto p-6">
          <Suspense fallback={<div>Loading Content...</div>}>
            <AdminContent activeSection={activeSection} />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Admin;
