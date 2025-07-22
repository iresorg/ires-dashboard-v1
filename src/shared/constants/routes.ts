export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",

  DASHBOARD: "/dashboard",
  INCIDENTS: "/dashboard/incidents",
  RESPONDERS: "/dashboard/responders",
  RESPONDER_TOKENS: "/dashboard/responders/:responderId/tokens",
  AGENTS: "/dashboard/agents",
  AGENT_TOKENS: "/dashboard/agents/:agentId/tokens",
  USERS: "/dashboard/users",
  TICKETS: "/dashboard/tickets",
  SETTINGS: "/dashboard/settings",
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.INCIDENTS,
  ROUTES.RESPONDERS,
  ROUTES.RESPONDER_TOKENS,
  ROUTES.AGENTS,
  ROUTES.AGENT_TOKENS,
] as const;

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER] as const;
