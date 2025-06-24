import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import Logo from "@/features/auth/components/Logo";

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
        width="30"
        height="30"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
    label: "Users",
    path: ROUTES.USERS,
    icon: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.34 13.01C17.1 11.95 17.5 10.68 17.5 9.38s-.4-2.58-1.16-3.64a6.24 6.24 0 0 1 6.81 1.54c.82.82 1.28 1.94 1.28 3.09s-.46 2.27-1.28 3.09a4.37 4.37 0 0 1-6.81-1.45ZM6.88 9.38c0-1.26.44-2.48 1.24-3.44A5.63 5.63 0 0 1 14.34 6.28c.61.61 1.03 1.39 1.21 2.23.18.84.1 1.73-.22 2.53a5.63 5.63 0 0 1-8.7 2.37 5.63 5.63 0 0 1-1.76-4.03ZM9.38 9.38c0 .37.11.73.31 1.05.2.31.49.57.84.71a1.88 1.88 0 0 0 2.08-.51c.27-.27.46-.63.53-1.01.08-.38.04-.77-.1-1.12a1.88 1.88 0 0 0-3.46.88ZM20 21.25v2.5H2.5v-2.5s0-5 8.75-5S20 21.25 20 21.25Zm-2.5 0c-.18-.98-1.67-2.5-6.25-2.5S5.09 20.39 5 21.25M19.94 16.25c.77.6 1.4 1.36 1.85 2.23.45.88.7 1.84.72 2.77v2.5h5v-2.5s0-4.54-7.56-5Z"
          fill="black"
        />
      </svg>
    ),
  },
  {
    label: "Agents",
    path: ROUTES.AGENTS,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.13 0.33c.34-.03.68-.05 1.03-.05.36 0 .71.02 1.06.05.55.05 1.07.3 1.45.72 5.42 1 9.91 5.56 10.13 11.15l2.57 3.27c.43.54.67 1.22.67 1.91 0 1.22-.72 2.35-1.9 2.82l-1.59.55-.56 3.84a2.64 2.64 0 0 1-2.12 2.21l-1.34-.2v1.6a1.25 1.25 0 0 1-2.5 0v-3.06c0-.3.1-.6.27-.85.18-.24.42-.44.7-.53l2.77.4.9-6.04c.07-.5.4-.94.86-1.1.73-.2 1.55-.53 2.18-.78.19-.07.34-.26.34-.49 0-.12-.04-.23-.11-.33l-2.83-3.6a1.25 1.25 0 0 1-.26-.77c0-4.1-3.01-7.68-6.99-8.8.01.57.01 1.25.01 2.02 0 .6 0 1.56-.01 2.18a7.93 7.93 0 0 1-1.01 14.52c1.55 1.4 3.5 2.2 5.33 2.2.53 0 1.03.21 1.41.59a2 2 0 0 1 0 2.82 2 2 0 0 1-1.41.59c-3.1 0-6.27-1.65-8.31-4.07a2.04 2.04 0 0 1-.18-.29 7.68 7.68 0 0 1-3.79-11.5 7.71 7.71 0 0 1 2.36-2.17c-.01-.74-.01-1.48-.01-2.22 0-.74 0-1.38.01-1.91-4.02 1.31-6.83 5.01-6.83 9.37 0 3.77 2.1 7.35 5.12 9.02.29.17.51.41.66.69.14.29.22.6.22.91v5c0 .33-.13.64-.36.87a1.25 1.25 0 0 1-2.13-.88v-4.3C3.17 21.85.9 17.67.9 13.29 0.9 7.36 5.06 2.39 10.62 1.15c.18-.23.41-.43.68-.56.26-.13.55-.21.84-.24Z"
          fill="black"
        />
      </svg>
    ),
  },
  {
    label: "Responders",
    path: ROUTES.RESPONDERS,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.25 10c.66 0 1.3.26 1.77.73.47.47.73 1.11.73 1.77v5c0 .66-.26 1.3-.73 1.77a2.5 2.5 0 0 1-1.77.73h-1.33c-.3 2.42-1.48 4.64-3.31 6.25A10 10 0 0 1 15 28.75v-2.5c1.99 0 3.9-.79 5.3-2.2A7.5 7.5 0 0 0 22.5 18.75v-7.5a7.5 7.5 0 0 0-7.5-7.5 7.5 7.5 0 0 0-7.5 7.5V20H3.75a2.5 2.5 0 0 1 0-10h1.33A10 10 0 0 1 15 1.25c2.43 0 4.79.97 6.61 2.5 1.83 1.61 3 3.83 3.31 6.25h1.33ZM9.7 19.73l1.33-2.12a10 10 0 0 0 8 0l1.33 2.12a11.25 11.25 0 0 1-10.66 0Z"
          fill="black"
        />
      </svg>
    ),
  },
  {
    label: "Tickets",
    path: ROUTES.TICKETS,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21.88 23.76V6.24a.94.94 0 0 0-1.56-.68l-1.59 1.06a1.25 1.25 0 0 1-1.58-.09l-1.93-1.54a.94.94 0 0 0-1.18 0l-1.93 1.54a1.25 1.25 0 0 1-1.58.09L9.68 5.56a.94.94 0 0 0-1.56.68v17.52c0 .34.18.66.47.84a.94.94 0 0 0 1.09-.06l1.59-1.06a1.25 1.25 0 0 1 1.58.09l1.93 1.54a.94.94 0 0 0 1.18 0l1.93-1.54a1.25 1.25 0 0 1 1.58-.09l1.59 1.06a.94.94 0 0 0 1.56-.68Z"
          stroke="currentColor"
          strokeWidth="1.25"
        />
        <path
          d="M11.88 11.88h6.25M11.88 15h6.25M11.88 18.12h6.25"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Settings",
    path: ROUTES.SETTINGS,
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const Aside: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white rounded-br-[40px] z-50 flex flex-col shadow-md">
      <div className="h-20 flex items-center justify-center">
        <Logo />
      </div>

      <nav className="flex-1 py-6">
        <ul className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-6 py-3 text-sm font-medium transition-all rounded-r-full ${
                    isActive
                      ? "bg-[#EAF1FF] text-[#0C0E5D] font-semibold shadow-sm"
                      : "text-gray-500 hover:bg-[#F5F7FA] hover:text-[#0C0E5D]"
                  }`}
                >
                  <div className="w-6 h-6">{item.icon}</div>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
