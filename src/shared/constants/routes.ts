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
  AGENTS: "/dashboard/agents",
} as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.INCIDENTS,
  ROUTES.RESPONDERS,
  ROUTES.AGENTS,
] as const;

export const PUBLIC_ROUTES = [
  ROUTES.SELECT_LOGIN,
  ROUTES.LOGIN,
  ROUTES.LOGIN_ADMIN,
  ROUTES.LOGIN_AGENT,
  ROUTES.LOGIN_RESPONDER,
  ROUTES.REGISTER,
] as const;
