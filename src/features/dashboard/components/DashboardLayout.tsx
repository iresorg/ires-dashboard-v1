import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Aside from "@/features/dashboard/Aside";
import Navbar from "@/features/dashboard/components/Navbar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Role } from "@/shared/types/roles";

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();

  const pathToTitleMap: Record<string, string> = {
    "/dashboard": "Admin Dashboard",
    "/dashboard/users": "User Management",
    "/dashboard/agents": "Agent Management",
    "/dashboard/agents/:agentId/tokens": "Agent Token Management",
    "/dashboard/responders": "Responder Management",
    "/dashboard/responders/:responderId/tokens": "Responder Token Management",
    "/dashboard/tickets": "Ticket Management", // will override dynamically below
  };

  // Function to resolve dynamic route titles
  const resolveTitle = (pathname: string): string => {
    for (const path in pathToTitleMap) {
      const regexPath = path.replace(/:[^/]+/g, "[^/]+"); // replace :params with regex
      const regex = new RegExp(`^${regexPath}$`);
      if (regex.test(pathname)) {
        // Special handling for /dashboard/tickets
        if (path === "/dashboard/tickets" && user) {
          if (
            user.role === Role.AGENT ||
            user.role === Role.AGENT_ADMIN ||
            user.role === "AGENT" ||
            user.role === "AGENT_ADMIN" ||
            user.role === "agent"
          ) {
            return "Agent Ticket Management";
          }
          if (
            user.role === Role.RESPONDER_ADMIN ||
            user.role === Role.RESPONDER_TIER_1 ||
            user.role === Role.RESPONDER_TIER_2 ||
            user.role === "RESPONDER_ADMIN" ||
            user.role === "RESPONDER_TIER_1" ||
            user.role === "RESPONDER_TIER_2" ||
            user.role === "responder"
          ) {
            return "Responder Ticket Management";
          }
        }
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

  // Function to get role-based dashboard title for main dashboard route
  const getRoleBasedTitle = (): string => {
    if (!user) return "Dashboard";

    const userRole = user.role;
    console.log("Getting title for user role:", userRole);

    if (
      userRole === Role.SUPER_ADMIN ||
      userRole === Role.ADMIN ||
      userRole === "SUPER_ADMIN" ||
      userRole === "ADMIN" ||
      userRole === "admin"
    ) {
      return "Admin Dashboard";
    }

    if (
      userRole === Role.AGENT ||
      userRole === Role.AGENT_ADMIN ||
      userRole === "AGENT" ||
      userRole === "AGENT_ADMIN" ||
      userRole === "agent"
    ) {
      return "Agent Dashboard";
    }

    if (
      userRole === Role.RESPONDER_ADMIN ||
      userRole === Role.RESPONDER_TIER_1 ||
      userRole === Role.RESPONDER_TIER_2 ||
      userRole === "RESPONDER_ADMIN" ||
      userRole === "RESPONDER_TIER_1" ||
      userRole === "RESPONDER_TIER_2" ||
      userRole === "responder"
    ) {
      return "Responder Dashboard";
    }

    return "Dashboard";
  };

  const pageName =
    pathname === "/dashboard" ? getRoleBasedTitle() : resolveTitle(pathname);

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
