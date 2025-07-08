import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Aside from "@/features/dashboard/Aside";
import Navbar from "@/features/dashboard/components/Navbar";

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;


  const pathToTitleMap: Record<string, string> = {
    "/dashboard": "Admin Dashboard",
    "/dashboard/users": "User Management",
    "/dashboard/agents": "Agent Management",
    "/dashboard/agents/:agentId/tokens": "Agent Token Management",
    "/dashboard/responders": "Responder Management",
    "/dashboard/responders/:responderId/tokens": "Responder Token Management",
    "/dashboard/tickets": "Ticket Management",
  };

  // Function to resolve dynamic route titles
  const resolveTitle = (pathname: string): string => {
    for (const path in pathToTitleMap) {
      const regexPath = path.replace(/:[^/]+/g, "[^/]+"); // replace :params with regex
      const regex = new RegExp(`^${regexPath}$`);
      if (regex.test(pathname)) {
        return pathToTitleMap[path];
      }
    }

    // Default fallback: use last segment formatted
    const lastSegment = pathname.split("/").pop();
    const formattedSegment =
      lastSegment
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()) ?? "Dashboard";

    return `${formattedSegment} Dashboard`;
  };

  const pageName = resolveTitle(pathname);

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
