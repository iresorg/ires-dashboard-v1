import { useNavigate } from "react-router-dom";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import Logo from "../components/Logo";
import { ThemeProvider } from "@/shared/ThemeContext";
import AdminIcon   from "@/shared/assets/icons/Group 14.svg";
import AgentIcon from "@/shared/assets/icons/Group 7.svg";
import ResponderIcon from "@/shared/assets/icons/Group 13 (1).svg";

const TabLogin = () => {
  const navigate = useNavigate();

  const handleAgentClick = (type: string) => {
    navigate(`/login/${type}`);
  };

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-[#FAF3F3] sm:bg-[#F2F2F2]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Theme Toggle */}
          <div>
            <ThemeToggle />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-5xl mb-4 text-center p-0 m-0 sm:text-6xl dark:text-[#F2F2F2] text-[#0C0E5D] font-extrabold sm:mt-0 mt-16">
          WELCOME!
        </h2>
        <p className="font-montserrat text-lg sm:text-2xl mb-6 text-center text-[#4A4A4A] dark:text-[#E2D1D1] -mt-3 font-extrabold">
          What do you want to login as?
        </p>

        {/* Button Grid */}
        <div className="grid grid-cols-1 grid-cols-3 sm:gap-6 p-4 max-w-sm sm:max-w-xl md:max-w-3xl mx-auto mt-6 justify-items-center items-center">
          <button
            className="row-start-1 col-start-1 duration-200 hover:opacity-50"
            type="button"
            onClick={() => handleAgentClick("agent")}
          >
            <img src={AgentIcon} className="sm:h-40 h-30"/> 
          </button>

          <button
            className="row-start-2 col-start-2 duration-200 hover:opacity-50"
            type="button"
            onClick={() => handleAgentClick("responder")}
          >
            <img src={ResponderIcon} className="sm:h-40 h-30"/> 
          </button>

          <button
            className="row-start-1 col-start-3 duration-200 hover:opacity-50"
            type="button"
            onClick={() => handleAgentClick("admin")}
          >
            <img src={AdminIcon} className="sm:h-40 h-30"/> 
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TabLogin;
