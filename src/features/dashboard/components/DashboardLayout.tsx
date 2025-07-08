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
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      <Aside />

      <div className="ml-64 flex flex-col w-full h-full">
        <Navbar pageName={pageName} />

       <main className="flex-1 overflow-y-auto px-6 py-6 space-y-10 max-h-[calc(100vh-80px)]">
  <Outlet />
</main>

         
      </div>
    </div>
  );
};

export default DashboardLayout;
