import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";
import Logo from "@/features/auth/components/Logo";
import Background from "@/shared/assets/images/Background.png";

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
        width="20"
        height="16"
        viewBox="0 0 26 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.3375 8.01248C15.0968 6.95156 15.5051 5.67963 15.5051 4.37498C15.5051 3.07034 15.0968 1.79841 14.3375 0.737485C15.0485 0.253149 15.8897 -0.00401646 16.75 -1.50395e-05C17.9103 -1.50395e-05 19.0231 0.460921 19.8436 1.28139C20.6641 2.10186 21.125 3.21466 21.125 4.37498C21.125 5.53531 20.6641 6.64811 19.8436 7.46858C19.0231 8.28905 17.9103 8.74998 16.75 8.74998C15.8897 8.75399 15.0485 8.49682 14.3375 8.01248ZM4.875 4.37498C4.875 3.50969 5.13159 2.66383 5.61232 1.94437C6.09305 1.2249 6.77633 0.664146 7.57576 0.333012C8.37519 0.00187884 9.25485 -0.0847608 10.1035 0.0840496C10.9522 0.25286 11.7317 0.669538 12.3436 1.28139C12.9554 1.89325 13.3721 2.6728 13.5409 3.52146C13.7097 4.37013 13.6231 5.2498 13.292 6.04922C12.9608 6.84865 12.4001 7.53193 11.6806 8.01266C10.9612 8.4934 10.1153 8.74998 9.25 8.74998C8.08968 8.74998 6.97688 8.28905 6.15641 7.46858C5.33594 6.64811 4.875 5.53531 4.875 4.37498Z"
          fill="currentColor"
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
          d="M12.13.33c.34-.03.68-.05 1.03-.05.36 0 .71.02 1.06.05.55.05 1.07.3 1.45.72 5.42 1 9.91 5.56 10.13 11.15l2.57 3.27c.43.54.67 1.22.67 1.91 0 1.22-.72 2.35-1.9 2.82l-1.59.55-.56 3.84a2.64 2.64 0 0 1-2.12 2.21l-1.34-.2v1.6a1.25 1.25 0 0 1-2.5 0v-3.06c0-.3.1-.6.27-.85.18-.24.42-.44.7-.53l2.77.4.9-6.04c.07-.5.4-.94.86-1.1.73-.2 1.55-.53 2.18-.78.19-.07.34-.26.34-.49 0-.12-.04-.23-.11-.33l-2.83-3.6a1.25 1.25 0 0 1-.26-.77c0-4.1-3.01-7.68-6.99-8.8.01.57.01 1.25.01 2.02 0 .6 0 1.56-.01 2.18a7.93 7.93 0 0 1-1.01 14.52c1.55 1.4 3.5 2.2 5.33 2.2.53 0 1.03.21 1.41.59a2 2 0 0 1 0 2.82 2 2 0 0 1-1.41.59c-3.1 0-6.27-1.65-8.31-4.07a2.04 2.04 0 0 1-.18-.29 7.68 7.68 0 0 1-3.79-11.5 7.71 7.71 0 0 1 2.36-2.17c-.01-.74-.01-1.48-.01-2.22 0-.74 0-1.38.01-1.91C6.6 2.46 3.79 6.16 3.79 10.52c0 3.77 2.1 7.35 5.12 9.02.29.17.51.41.66.69.14.29.22.6.22.91v5c0 .33-.13.64-.36.87a1.25 1.25 0 0 1-2.13-.88v-4.3C3.17 21.85.9 17.67.9 13.29 0.9 7.36 5.06 2.39 10.62 1.15c.18-.23.41-.43.68-.56.26-.13.55-.21.84-.24Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
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
          d="M26.25 10c.66 0 1.3.26 1.77.73.47.47.73 1.11.73 1.77v5c0 .66-.26 1.3-.73 1.77a2.5 2.5 0 0 1-1.77.73h-1.33c-.3 2.42-1.48 4.64-3.31 6.25A10 10 0 0 1 15 28.75v-2.5c1.99 0 3.9-.79 5.3-2.2A7.5 7.5 0 0 0 22.5 18.75v-7.5a7.5 7.5 0 0 0-7.5-7.5 7.5 7.5 0 0 0-7.5 7.5V20H3.75a2.5 2.5 0 0 1 0-10h1.33A10 10 0 0 1 15 1.25c2.43 0 4.79.97 6.61 2.5 1.83 1.61 3 3.83 3.31 6.25h1.33Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
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
];

const Aside: React.FC = () => {
  const location = useLocation();
  const isActiveSettings = location.pathname === ROUTES.SETTINGS;

  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 bg-cover bg-center rounded-br-[40px] z-50 flex flex-col shadow-md"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="h-20 flex items-center px-6">
        <Logo />
      </div>

      <nav className="flex-1 pt-0 pb-0">
        <ul className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-6 py-3 text-sm font-medium transition-all rounded-r-full ${
                    isActive
                      ? "text-black font-semibold"
                      : "text-gray-500 hover:bg-[#F5F7FA] hover:text-[#0C0E5D]"
                  }`}
                >
                  <div className="w-6 h-6 text-inherit">{item.icon}</div>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}

          {/* Settings*/}
          <li className="mt-10">
            <Link
              to={ROUTES.SETTINGS}
              className={`flex items-center gap-4 px-6 py-3 text-sm font-medium transition-all rounded-r-full ${
                isActiveSettings
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:bg-[#F5F7FA] hover:text-[#0C0E5D]"
              }`}
            >
              <div className="w-6 h-6">
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
              </div>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
