import React from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import DashboardPage from "./DashboardPage";
import AgentDashboard from "@/features/agents/components/AgentDashboard";
import ResponderDashboard from "@/features/responders/components/ResponderDashboard";
import { Role } from "@/shared/types/roles";

const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();

  // If no user, show loading or redirect
  if (!user) {
    return <div>Loading...</div>;
  }

  const userRole = user.role;

  // Debug information (can be removed in production)
  console.log("Current user role:", userRole);
  console.log("Available roles:", Object.values(Role));

  // Super Admin and Admin see the main dashboard
  if (
    userRole === Role.SUPER_ADMIN || 
    userRole === Role.ADMIN ||
    userRole === "SUPER_ADMIN" ||
    userRole === "ADMIN" ||
    userRole === "admin"
  ) {
    console.log("Showing Admin Dashboard");
    return <DashboardPage />;
  }

  // Agent and Agent Admin see the agent dashboard
  if (
    userRole === Role.AGENT || 
    userRole === Role.AGENT_ADMIN ||
    userRole === "AGENT" ||
    userRole === "AGENT_ADMIN" ||
    userRole === "agent"
  ) {
    console.log("Showing Agent Dashboard");
    return <AgentDashboard />;
  }

  // Responder roles see the responder dashboard
  if (
    userRole === Role.RESPONDER_ADMIN ||
    userRole === Role.RESPONDER_TIER_1 ||
    userRole === Role.RESPONDER_TIER_2 ||
    userRole === "RESPONDER_ADMIN" ||
    userRole === "RESPONDER_TIER_1" ||
    userRole === "RESPONDER_TIER_2" ||
    userRole === "responder"
  ) {
    console.log("Showing Responder Dashboard");
    return <ResponderDashboard />;
  }

  // Fallback to main dashboard
  console.log("Fallback to Admin Dashboard");
  return <DashboardPage />;
};

export default RoleBasedDashboard;
