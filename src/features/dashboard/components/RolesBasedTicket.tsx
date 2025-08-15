import React from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import TicketsPage from "@/features/tickets/components/TicketsPage";
import AgentTicket from "@/features/agents/components/AgentTicket";
import ResponderTicket from "@/features/responders/components/ResponderTicket";
import { Role } from "@/shared/types/roles";

const RoleBasedTickets: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const userRole = user.role;

  // Admin & Super Admin
  if (userRole === Role.SUPER_ADMIN || userRole === Role.ADMIN) {
    return <TicketsPage />;
  }

  // Agent & Agent Admin
  if (userRole === Role.AGENT || userRole === Role.AGENT_ADMIN) {
    return <AgentTicket />;
  }

  // Responder roles
  if (
    userRole === Role.RESPONDER_ADMIN ||
    userRole === Role.RESPONDER_TIER_1 ||
    userRole === Role.RESPONDER_TIER_2
  ) {
    return <ResponderTicket />;
  }

  // Fallback
  return <TicketsPage />;
};

export default RoleBasedTickets;
