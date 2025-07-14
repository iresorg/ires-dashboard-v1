export const ROUTES = {
  SELECT_LOGIN: "/",
  LOGIN: "/login/:type",
  LOGIN_ADMIN: "/login/admin",
  LOGIN_AGENT: "/login/agent",
  LOGIN_RESPONDER: "/login/responder",
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
  ROUTES.RESPONDER_TOKENS, // ✅ added here too
  ROUTES.AGENTS,
  ROUTES.AGENT_TOKENS,
] as const;

export const PUBLIC_ROUTES = [
  ROUTES.SELECT_LOGIN,
  ROUTES.LOGIN,
  ROUTES.LOGIN_ADMIN,
  ROUTES.LOGIN_AGENT,
  ROUTES.LOGIN_RESPONDER,
  ROUTES.REGISTER,
] as const;
