import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import Logo from "@/features/auth/components/Logo";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Role } from "@/shared/types/roles";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles?: string[];
}

const navItems: NavItem[] = [
  {
    label: "Overview",
    path: ROUTES.DASHBOARD,
    icon: (
      <svg width="18" height="18" viewBox="0 0 34 34" fill="none">
        <path
          d="M26.15 14.88h-4.86a2.42 2.42 0 0 0-2.41 2.41v4.86a2.42 2.42 0 0 0 2.41 2.41h4.86a2.42 2.42 0 0 0 2.41-2.41v-4.86a2.42 2.42 0 0 0-2.41-2.41ZM26.15 1.44H7.85a2.42 2.42 0 0 0-2.41 2.41v4.86a2.42 2.42 0 0 0 2.41 2.42h18.3a2.42 2.42 0 0 0 2.41-2.42V3.85a2.42 2.42 0 0 0-2.41-2.41ZM12.71 14.88H7.85a2.42 2.42 0 0 0-2.41 2.41v4.86a2.42 2.42 0 0 0 2.41 2.41h4.86a2.42 2.42 0 0 0 2.41-2.41v-4.86a2.42 2.42 0 0 0-2.41-2.41Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Tickets",
    path: ROUTES.TICKETS,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v1.2a2.2 2.2 0 0 0 0 4.2V14.5A2.5 2.5 0 0 1 17.5 17h-11A2.5 2.5 0 0 1 4 14.5v-1.6a2.2 2.2 0 0 0 0-4.2V7.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 9h6M9 12h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Users",
    path: ROUTES.USERS,
    icon: (
      <svg width="18" height="18" viewBox="0 0 26 19" fill="none">
        <path
          d="M14.3375 8.01248C15.0968 6.95156 15.5051 5.67963 15.5051 4.37498C15.5051 3.07034 15.0968 1.79841 14.3375 0.737485C15.0485 0.253149 15.8897 -0.00401646 16.75 -1.50395e-05C17.9103 -1.50395e-05 19.0231 0.460921 19.8436 1.28139C20.6641 2.10186 21.125 3.21466 21.125 4.37498C21.125 5.53531 20.6641 6.64811 19.8436 7.46858C19.0231 8.28905 17.9103 8.74998 16.75 8.74998C15.8897 8.75399 15.0485 8.49682 14.3375 8.01248ZM4.875 4.37498C4.875 3.50969 5.13159 2.66383 5.61232 1.94437C6.09305 1.2249 6.77633 0.664146 7.57576 0.333012C8.37519 0.00187884 9.25485 -0.0847608 10.1035 0.0840496C10.9522 0.25286 11.7317 0.669538 12.3436 1.28139C12.9554 1.89325 13.3721 2.6728 13.5409 3.52146C13.7097 4.37013 13.6231 5.2498 13.292 6.04922C12.9608 6.84865 12.4001 7.53193 11.6806 8.01266C10.9612 8.4934 10.1153 8.74998 9.25 8.74998C8.08968 8.74998 6.97688 8.28905 6.15641 7.46858C5.33594 6.64811 4.875 5.53531 4.875 4.37498Z"
          fill="currentColor"
        />
      </svg>
    ),
    roles: [Role.SUPER_ADMIN, Role.ADMIN],
  },
  {
    label: "Agents",
    path: ROUTES.AGENTS,
    icon: (
      <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.13.33c.34-.03.68-.05 1.03-.05.36 0 .71.02 1.06.05.55.05 1.07.3 1.45.72 5.42 1 9.91 5.56 10.13 11.15l2.57 3.27c.43.54.67 1.22.67 1.91 0 1.22-.72 2.35-1.9 2.82l-1.59.55-.56 3.84a2.64 2.64 0 0 1-2.12 2.21l-1.34-.2v1.6a1.25 1.25 0 0 1-2.5 0v-3.06c0-.3.1-.6.27-.85.18-.24.42-.44.7-.53l2.77.4.9-6.04c.07-.5.4-.94.86-1.1.73-.2 1.55-.53 2.18-.78.19-.07.34-.26.34-.49 0-.12-.04-.23-.11-.33l-2.83-3.6a1.25 1.25 0 0 1-.26-.77c0-4.1-3.01-7.68-6.99-8.8.01.57.01 1.25.01 2.02 0 .6 0 1.56-.01 2.18a7.93 7.93 0 0 1-1.01 14.52c1.55 1.4 3.5 2.2 5.33 2.2.53 0 1.03.21 1.41.59a2 2 0 0 1 0 2.82 2 2 0 0 1-1.41.59c-3.1 0-6.27-1.65-8.31-4.07a2.04 2.04 0 0 1-.18-.29 7.68 7.68 0 0 1-3.79-11.5 7.71 7.71 0 0 1 2.36-2.17c-.01-.74-.01-1.48-.01-2.22 0-.74 0-1.38.01-1.91C6.6 2.46 3.79 6.16 3.79 10.52c0 3.77 2.1 7.35 5.12 9.02.29.17.51.41.66.69.14.29.22.6.22.91v5c0 .33-.13.64-.36.87a1.25 1.25 0 0 1-2.13-.88v-4.3C3.17 21.85.9 17.67.9 13.29 0.9 7.36 5.06 2.39 10.62 1.15c.18-.23.41-.43.68-.56.26-.13.55-.21.84-.24Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT_ADMIN],
  },
  {
    label: "Responders",
    path: ROUTES.RESPONDERS,
    icon: (
      <svg width="18" height="18" viewBox="0 0 30 30" fill="none">
        <path
          d="M26.25 10c.66 0 1.3.26 1.77.73.47.47.73 1.11.73 1.77v5c0 .66-.26 1.3-.73 1.77a2.5 2.5 0 0 1-1.77.73h-1.33c-.3 2.42-1.48 4.64-3.31 6.25A10 10 0 0 1 15 28.75v-2.5c1.99 0 3.9-.79 5.3-2.2A7.5 7.5 0 0 0 22.5 18.75v-7.5a7.5 7.5 0 0 0-7.5-7.5 7.5 7.5 0 0 0-7.5 7.5V20H3.75a2.5 2.5 0 0 1 0-10h1.33A10 10 0 0 1 15 1.25c2.43 0 4.79.97 6.61 2.5 1.83 1.61 3 3.83 3.31 6.25h1.33Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
    roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.RESPONDER_ADMIN],
  },
  {
    label: "Subscriptions",
    path: ROUTES.SUBSCRIPTION_PLANS,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M4 9h16M8 13.5h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    roles: [Role.SUPER_ADMIN, Role.ADMIN],
  },
  {
    label: "Financials",
    path: ROUTES.FINANCIALS,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19h16M6 16V9M10 16V5M14 16v-4M18 16v-7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    roles: [Role.SUPER_ADMIN, Role.ADMIN],
  },
];

const externalCTA = {
  label: "External CTA",
  roles: [Role.SUPER_ADMIN, Role.ADMIN, Role.AGENT, Role.AGENT_ADMIN],
  children: [
    { label: "Users", path: ROUTES.CTA_USERS },
    { label: "Subscribers", path: ROUTES.CTA_SUBSCRIBERS },
  ],
};

const Aside: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isCtaRoute = location.pathname.startsWith("/dashboard/external-cta");
  const [ctaOpen, setCtaOpen] = useState(isCtaRoute);

  useEffect(() => {
    if (isCtaRoute) setCtaOpen(true);
  }, [isCtaRoute]);

  const canSeeCTA = useMemo(() => {
    if (!user || !user.role) return false;
    return externalCTA.roles.some((role) => role === user.role);
  }, [user]);

  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  return (
    <aside className="fixed top-0 left-0 h-screen w-52 bg-[var(--ires-navy-blue)] text-white flex flex-col z-50">
      <div className="h-14 shrink-0 flex items-center px-4 border-b border-white/10">
        <Logo variant="light" className="h-6 w-auto" />
      </div>

      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-0.5">
          {filteredNavItems.map((item) => {
            const isActive =
              item.path === ROUTES.DASHBOARD
                ? location.pathname === item.path
                : location.pathname === item.path ||
                  location.pathname.startsWith(`${item.path}/`);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                    isActive
                      ? "bg-white/12 text-white font-semibold shadow-[inset_3px_0_0_#D10F24]"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                      isActive
                        ? "bg-[var(--ires-red)] text-white"
                        : "bg-white/8 text-white/80"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {canSeeCTA && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setCtaOpen((open) => !open)}
              className="w-full flex items-center justify-between px-2.5 py-2 text-[13px] text-white/70 hover:text-white cursor-pointer"
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/8">
                  <svg width="14" height="14" viewBox="0 0 25 25" fill="none">
                    <path
                      d="M13.75 3.75c2.7625 0 5 2.2375 5 5 0 1.875-1 3.4625-2.5 4.325v-1.525c.7625-.6875 1.25-1.6875 1.25-2.8 0-2.075-1.675-3.75-3.75-3.75s-3.75 1.675-3.75 3.75c0 1.1125.4875 2.1125 1.25 2.8v1.525c-1.5-.8625-2.5-2.45-2.5-4.325 0-2.7625 2.2375-5 5-5z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="truncate">{externalCTA.label}</span>
              </span>
              <svg
                className={`shrink-0 transition-transform duration-200 ${ctaOpen ? "rotate-180" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 20 20"
              >
                <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>

            {ctaOpen && (
              <ul className="mt-0.5 ml-2 space-y-0.5">
                {externalCTA.children.map((child) => {
                  const active = location.pathname === child.path;

                  return (
                    <li key={child.path}>
                      <Link
                        to={child.path}
                        className={`block rounded-md px-2.5 py-1.5 text-[13px] ${
                          active
                            ? "bg-white/12 text-white font-medium"
                            : "text-white/60 hover:bg-white/8 hover:text-white"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-2">
        <Link
          to={ROUTES.DOCS}
          className={`group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
            location.pathname === ROUTES.DOCS ||
            location.pathname.startsWith(`${ROUTES.DOCS}/`)
              ? "bg-white/12 text-white font-semibold shadow-[inset_3px_0_0_#D10F24]"
              : "text-white/70 hover:bg-white/8 hover:text-white"
          }`}
        >
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
              location.pathname === ROUTES.DOCS ||
              location.pathname.startsWith(`${ROUTES.DOCS}/`)
                ? "bg-[var(--ires-red)] text-white"
                : "bg-white/8 text-white/80"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 3.5A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5L14 3.5H7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M14 3.5V8.5h5M8.5 12h7M8.5 15.5h7M8.5 8.5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="truncate">Documentation</span>
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
