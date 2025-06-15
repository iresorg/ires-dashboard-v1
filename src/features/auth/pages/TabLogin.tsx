import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import { ThemeProvider } from "@/shared/ThemeContext";
//import PentagonIcon from "@/shared/assets/icons/pentagon-icon.svg?react";
import AdminIcon from "@/shared/assets/icons/admin.png";
import AgentIcon from "@/shared/assets/icons/agent.svg";
import ResponderIcon from "@/shared/assets/icons/responder.svg";

const LOGIN_TYPES = [
  { label: "Admin", value: "admin", icon: AdminIcon },
  { label: "Agent", value: "agent", icon: AgentIcon },
  { label: "Responder", value: "responder", icon: ResponderIcon },
];

const TabLogin = () => {
  const navigate = useNavigate();

  const handleLoginTypeClick = (type: string) => {
    navigate(`/login/${type}`);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <div className="w-full flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <img
              alt="iRES Logo"
              className="block dark:hidden h-8 w-auto"
              src="/src/shared/assets/logos/ires-logo-dark.svg"
            />
            <img
              alt="iRES Logo"
              className="hidden dark:block h-8 w-auto"
              src="/src/shared/assets/logos/ires-logo-white.svg"
            />
          </div>

          {/* Theme Toggle */}
          <div>
            <ThemeToggle />
          </div>
        </div>
        <h2 className="text-5xl font-bold mb-6 text-center p-0 m-0 md:text-6xl">WELCOME!</h2>
        <p className="text-lg font-bold mb-6 text-center md:text-xl">What do you want to login as?</p>
        {/* Space Here -- Just to unconfused my confused confusion */}
        <div className="flex flex-col items-center justify-center md:flex-row">
          {LOGIN_TYPES.map((type) => (
            <button
              key={type.value}
              className="pentagon-btn bg-[var(--ires-white)] text-[var(--ires-black)] flex flex-col items-center justify-center w-35 h-35 mb-5 mx-1 border-2 font-semibold transition-colors duration-200 text-sm"
              onClick={() => handleLoginTypeClick(type.value)}
              type="button">
              <img src={type.icon} alt={type.label} className="w-7 h-7 mb-2" />
              {type.label}
            </button>

          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TabLogin;