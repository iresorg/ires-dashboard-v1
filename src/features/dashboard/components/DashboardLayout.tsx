import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Aside from "@/features/dashboard/Aside";
import ThemeToggle from "@shared/components/ui/ThemeToggle";

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Get clean page name for header
  const pathname = location.pathname;
  const pageName =
    pathname === "/dashboard"
      ? "Admin Dashboard"
      : pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Aside />

      {/* Main Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-8">
            <h2 className="text-2xl font-bold text-[#0C0E5D] capitalize">
              {pageName}
            </h2>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button>
                <ThemeToggle />
              </button>

              {/* User Info */}
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || "User"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
