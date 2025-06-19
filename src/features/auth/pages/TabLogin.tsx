import { useNavigate } from "react-router-dom";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import Logo from "../components/Logo";
import { ThemeProvider } from "@/shared/ThemeContext";
import AdminIcon from "@/shared/assets/icons/Group 14.svg?react";
import AgentIcon from "@/shared/assets/icons/Group 7.svg?react";
import ResponderIcon from "@/shared/assets/icons/Group 13 (1).svg?react";

const TabLogin = () => {
  const navigate = useNavigate();

  const handleAgentClick = (type: string) => {
    navigate(`/login/${type}`);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="w-full flex items-center justify-between px-6 py-4">
          <Logo />
          <ThemeToggle />
        </div>

        {/* Heading */}
        <h2 className="text-2xl mb-4 text-center p-0 m-0 md:text-6xl dark:text-[#F2F2F2] text-[#0C0E5D] font-extrabold">
          WELCOME!
        </h2>
        <p className="font-montserrat text-lg mb-6 text-center text-[#4A4A4A] dark:text-[#E2D1D1] -mt-3 font-extrabold">
          What do you want to login as?
        </p>

        {/* Button Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-5xl mx-auto mt-6 justify-items-center items-center">
          <button
            className="row-start-1 col-start-1 duration-200 hover:opacity-50"
            type="button"
            onClick={() => handleAgentClick("agent")}
          >
            <AgentIcon />
          </button>

          <button
            className="row-start-2 col-start-2 duration-200 hover:opacity-50"
            type="button"
            onClick={() => handleAgentClick("responder")}
          >
            <ResponderIcon />
          </button>

          <button
            className="row-start-1 col-start-3 duration-200 hover:opacity-50"
            type="button"
            onClick={() => handleAgentClick("admin")}
          >
            <AdminIcon />
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TabLogin;
