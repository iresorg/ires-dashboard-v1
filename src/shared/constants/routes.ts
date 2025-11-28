export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",

  // Dashboard
  DASHBOARD: "/dashboard",
  INCIDENTS: "/dashboard/incidents",
  RESPONDERS: "/dashboard/responders",
  AGENTS: "/dashboard/agents",
  USERS: "/dashboard/users",
  TICKETS: "/dashboard/tickets",

  //  External CTA Routes
  CTA_USERS: "/dashboard/external-cta/users",
  CTA_SUBSCRIBERS: "/dashboard/external-cta/subscribers",
} as const;

// Routes protected by auth middleware
export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.INCIDENTS,
  ROUTES.RESPONDERS,
  ROUTES.AGENTS,
  ROUTES.USERS,
  ROUTES.TICKETS,

  ROUTES.CTA_USERS,
  ROUTES.CTA_SUBSCRIBERS,
] as const;

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER] as const;
