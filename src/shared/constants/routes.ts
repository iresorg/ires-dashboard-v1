export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",

  // Dashboard
  DASHBOARD: "/dashboard",
  INCIDENTS: "/dashboard/incidents",
  RESPONDERS: "/dashboard/responders",
  AGENTS: "/dashboard/agents",
  USERS: "/dashboard/users",
  SUBSCRIPTION_PLANS: "/dashboard/subscription-plans",
  FINANCIALS: "/dashboard/financials",
  TICKETS: "/dashboard/tickets",
  TICKET_CATEGORIES: "/dashboard/ticket-categories",
  TICKET_ESCALATIONS: "/dashboard/tickets/escalations",

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
  ROUTES.SUBSCRIPTION_PLANS,
  ROUTES.FINANCIALS,
  ROUTES.TICKETS,
  ROUTES.TICKET_CATEGORIES,
  ROUTES.TICKET_ESCALATIONS,

  ROUTES.CTA_USERS,
  ROUTES.CTA_SUBSCRIBERS,
] as const;

// Public routes that don't require authentication
export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER] as const;
