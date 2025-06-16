import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import Logo from "../components/Logo";
import { ThemeProvider } from "@/shared/ThemeContext";
import PentagonIcon from "@/shared/assets/icons/pentagon-icon1.svg?react";
import AdminIcon from "@/shared/assets/icons/admin.png";
import AgentIcon from "@/shared/assets/icons/agent.svg";
import ResponderIcon from "@/shared/assets/icons/responder.svg";

const LOGIN_TYPES = [
  { label: "Admin", value: "admin", icon: AdminIcon },
  { label: "Agent", value: "agent", icon: AgentIcon },
  { label: "Responder", value: "responder", icon: ResponderIcon },
];

const positions = [
  "md:relative top-10 right-20", // Admin
  "md:relative top-50 left-5", // Agent
  "md:relative top-10 left-20", // Responder
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
            <Logo />
          </div>

          {/* Theme Toggle */}
          <div>
            <ThemeToggle />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center p-0 m-0 md:text-6xl dark:text-iresWhite text-iresDarkBlue">
          WELCOME!
        </h2>
        <p className="text-lg font-semibold mb-6 text-center">
          What do you want to login as?
        </p>

        {/* Space Here -- Just to unconfuse my confused confusion */}
        <div className="flex flex-col items-center justify-center md:flex-row">
          {LOGIN_TYPES.map((type, idx) => (
            <button
              key={type.value}
              className={`bg-transparent text-[var(--ires-black)] flex flex-col items-center justify-center w-30 h-30 mb-3 mx-1 md:w-40 md:h-40 font-semibold text-sm ${positions[idx]}`}
              onClick={() => handleLoginTypeClick(type.value)}
              type="button"
            >
              <PentagonIcon className="absolute inset-0 w-full h-full hover:animate-breathe" />
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
