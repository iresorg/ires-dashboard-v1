/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@shared/ThemeContext";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import AdminLoginForm from "@features/auth/components/AdminLoginForm";
import AgentLoginForm from "@features/auth/components/AgentLoginForm";
import ResponderLoginForm from "@features/auth/components/ResponderLoginForm";
import securityLaptop from "@shared/assets/images/security-laptop.png";
import logoWhite from "@shared/assets/logos/ires-logo-white.svg";
import logoDark from "@shared/assets/logos/ires-logo-dark.svg";

const LoginPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const loginType = type ?? "admin"; // fallback if type is missing

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {/* Top Navbar */}
        <div className="w-full flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logoDark}
              alt="iRES Logo"
              className="block dark:hidden h-8 w-auto"
            />
            <img
              src={logoWhite}
              alt="iRES Logo"
              className="hidden dark:block h-8 w-auto"
            />
          </div>

          {/* Theme Toggle */}
          <div>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full h-full mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden px-4">
            {/* Left: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 py-12 md:py-16">
              <div>
                {loginType === "admin" && <AdminLoginForm />}
                {loginType === "agent" && <AgentLoginForm />}
                {loginType === "responder" && <ResponderLoginForm />}
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:flex items-center">
              <div className="h-120 w-px bg-gray-300 dark:bg-gray-700 mx-4" />
            </div>

            {/* Right: Image */}
            <div className="hidden md:flex flex-1 items-center justify-center bg-transparent p-8">
              <img
                src={securityLaptop}
                alt="Security Laptop"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;