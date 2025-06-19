export const ROUTES = {
  SELECT_LOGIN: "/", 
  LOGIN: "/login/:type", 
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  INCIDENTS: "/dashboard/incidents",
  RESPONDERS: "/dashboard/responders",
  AGENTS: "/dashboard/agents",
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.INCIDENTS,
  ROUTES.RESPONDERS,
  ROUTES.AGENTS,
] as const;
