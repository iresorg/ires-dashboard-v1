import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import useStore from "@/shared/store/useStore";
import Aside from "@/features/dashboard/Aside"; // ✅ Importing the custom Aside component

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth(); // ✅ Removed logout
  const { theme, setTheme } = useStore(); // ✅ Still needed for theme toggle

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <Aside />

      {/* Main Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-8">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {location.pathname.split("/").pop() || "Dashboard"}
            </h2>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {theme === "light" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>

              {/* User */}
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
