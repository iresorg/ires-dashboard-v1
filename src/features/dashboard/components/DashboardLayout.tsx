import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Aside from "@/features/dashboard/Aside";
import Navbar from "@/features/dashboard/components/Navbar";

const DashboardLayout: React.FC = () => {
  const location = useLocation();


  const pathname = location.pathname;
  const lastSegment = pathname.split("/").pop();

  const formattedSegment =
    lastSegment
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()) ?? "Dashboard";

  const pageName =
    pathname === "/dashboard"
      ? "Admin Dashboard"
      : `${formattedSegment} Dashboard`;

  return (
    <div className="min-h-screen bg-gray-100">
      <Aside />

      <div className="ml-64 flex flex-col min-h-screen">
        <Navbar pageName={pageName} />

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
