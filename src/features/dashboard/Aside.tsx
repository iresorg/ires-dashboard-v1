import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Overview",
    path: ROUTES.DASHBOARD,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.15 14.88H21.29A2.42 2.42 0 0018.88 17.29v4.86a2.42 2.42 0 002.41 2.41h4.86a2.42 2.42 0 002.41-2.41v-4.86a2.42 2.42 0 00-2.41-2.41ZM26.15 1.44H7.85a2.42 2.42 0 00-2.41 2.41v4.86a2.42 2.42 0 002.41 2.42h18.3a2.42 2.42 0 002.41-2.42V3.85a2.42 2.42 0 00-2.41-2.41ZM12.71 14.88H7.85a2.42 2.42 0 00-2.41 2.41v4.86a2.42 2.42 0 002.41 2.41h4.86a2.42 2.42 0 002.41-2.41v-4.86a2.42 2.42 0 00-2.41-2.41Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Users",
    path: ROUTES.USERS,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.34 13.01C17.1 11.95 17.5 10.68 17.5 9.37c0-1.3-.4-2.57-1.16-3.63a6.24 6.24 0 013.41-.74c1.16 0 2.27.46 3.1 1.29.82.82 1.28 1.93 1.28 3.08s-.46 2.26-1.28 3.08a4.42 4.42 0 01-3.1 1.28c-1.2.01-2.36-.35-3.41-.73Zm-9.46-3.64c0-1.18.34-2.33.99-3.33a5.57 5.57 0 012.7-2.25c.9-.34 1.87-.42 2.81-.22a5.63 5.63 0 012.24 1.15 5.63 5.63 0 011.15 2.23c.2.93.12 1.9-.22 2.79a5.58 5.58 0 01-2.24 2.7 5.56 5.56 0 01-3.33.99 4.43 4.43 0 01-3.08-1.28 4.38 4.38 0 01-1.29-3.08Zm2.5 0c0 .38.1.75.3 1.08.2.33.48.6.82.75.34.15.72.2 1.09.12a1.88 1.88 0 001.04-.57c.28-.28.47-.65.55-1.03.08-.38.04-.77-.11-1.13a1.88 1.88 0 00-.75-.82 1.86 1.86 0 00-1.09-.3 2 2 0 00-1.42.58c-.38.37-.58.88-.58 1.4ZM20 21.25v2.5H2.5v-2.5S2.5 16.25 11.25 16.25 20 21.25 20 21.25Zm-2.5 0c-.17-.97-1.65-2.5-6.25-2.5S5.09 20.39 5 21.25M19.94 16.25a9.12 9.12 0 012.84 2.22c.54.66.98 1.4 1.29 2.19.3.78.47 1.6.48 2.44v.65H27.5v-2.5s0-4.54-7.56-4.96Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Agents",
    path: ROUTES.AGENTS,
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M12.13.33c.34-.03.69-.05 1.03-.05.36 0 .71.02 1.06.05.55.05 1.07.3 1.5.72 5.45 1 9.94 5.58 10.17 11.16l2.57 3.27c.43.55.66 1.23.66 1.92 0 1.22-.72 2.37-1.9 2.84-.46.18-1.03.4-1.6.57l-.57 3.83c-.1.72-.5 1.38-1.1 1.82a2.61 2.61 0 0 1-2.05.24l-1.34-.2v1.61c0 .33-.13.64-.36.88a1.25 1.25 0 0 1-1.77 0 1.25 1.25 0 0 1-.36-.88v-3.06c0-.17.04-.34.12-.5.08-.16.18-.31.32-.44.14-.13.3-.24.48-.3.17-.05.36-.07.54-.04l2.77.4c.06 0 .13-.01.18-.03.06-.01.11-.05.15-.08a.48.48 0 0 0 .13-.17l.69-4.62c.04-.24.14-.46.3-.65.16-.18.37-.31.61-.38.67-.18 1.47-.48 2.1-.72.18-.07.32-.25.32-.47a.58.58 0 0 0-.12-.36l-2.83-3.6a1.35 1.35 0 0 1-.29-.84c0-4.1-3.04-7.7-7.09-8.9 0 .57.01 1.26.01 2.04 0 .58 0 1.53 0 2.15a7.9 7.9 0 0 1 1.94 10.01 7.9 7.9 0 0 1-6.61 3.38c1.55 1.35 3.5 2.17 5.33 2.17.2 0 .4.04.58.12.18.07.34.18.48.31.14.14.25.3.31.48.07.18.1.37.1.56s-.03.38-.1.56a1.26 1.26 0 0 1-.31.48 1.26 1.26 0 0 1-.48.31 1.25 1.25 0 0 1-.58.12c-3.12 0-6.27-1.67-8.3-4.11a2.5 2.5 0 0 1-.18-.29 7.94 7.94 0 0 1-5.06-9.01 8.05 8.05 0 0 1 2.38-3.5c0-.71-.01-1.42-.01-2.13 0-.73 0-1.38.01-1.92-4.01 1.35-6.79 5.11-6.79 9.44 0 3.77 2.1 7.33 5.14 9.02.2.11.36.26.49.45.12.19.19.41.19.63v5.01c0 .33-.13.64-.36.88a1.25 1.25 0 0 1-1.77 0 1.25 1.25 0 0 1-.36-.88v-4.3c-3.49-2.23-5.75-6.42-5.75-10.82 0-5.94 4.17-10.87 9.72-12.11.18-.23.41-.42.67-.56.26-.14.55-.23.84-.26Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: "Responders",
    path: ROUTES.RESPONDERS,
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <path
          d="M26.25 10c.73 0 1.43.29 1.95.8.52.52.8 1.22.8 1.95v5c0 .73-.28 1.43-.8 1.95a2.75 2.75 0 0 1-1.95.8h-1.33a12.7 12.7 0 0 1-4.64 8.75A13.75 13.75 0 0 1 15 28.75v-2.5a11.2 11.2 0 0 0 8.8-10v-7.5a11.2 11.2 0 0 0-8.8-10 11.2 11.2 0 0 0-8.8 10v8.75H3.75a2.75 2.75 0 0 1-2.75-2.75v-5A2.75 2.75 0 0 1 3.75 10h1.33A12.7 12.7 0 0 1 15 1.25a12.7 12.7 0 0 1 9.92 8.75h1.33ZM9.7 19.73l1.33-2.12a10.34 10.34 0 0 0 8 0l1.33 2.12a12.25 12.25 0 0 1-10.66 0Z"
          fill="white"
        />
      </svg>
    ),
  },
  {
    label: "Tickets",
    path: ROUTES.TICKETS,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-4 4h.01"
        />
      </svg>
    ),
  },
  {
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6 1a9 9 0 11-6.219-8.56"
        />
      </svg>
    ),
  },
];

const Aside: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#2A344F] text-white flex flex-col">
      {/* Branding */}
      <div className="flex items-center justify-center h-16 border-b border-[#3B4664]">
        <h1 className="text-lg font-bold tracking-wide">IRES Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#3B4664] text-white"
                    : "text-gray-300 hover:bg-[#3B4664] hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
