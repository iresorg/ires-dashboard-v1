/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ThemeProvider } from "@shared/ThemeContext";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import AdminLoginForm from "@features/auth/components/AdminLoginForm";
import AgentLoginForm from "@features/auth/components/AgentLoginForm";
import ResponderLoginForm from "@features/auth/components/ResponderLoginForm";
import securityLaptop from "@shared/assets/images/security-laptop.png";
import logoWhite from "@shared/assets/logos/ires-logo-white.svg";
import logoDark from "@shared/assets/logos/ires-logo-dark.svg";

const LOGIN_TYPES = [
  { label: "Admin", value: "admin" },
  { label: "Agent", value: "agent" },
  { label: "Responder", value: "responder" },
];

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState("admin");

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
            {/* Tab Switcher */}
            <div className="flex mb-8">
              {LOGIN_TYPES.map((type) => (
                <button
                  key={type.value}
                  className={`flex-1 px-4 py-2 mx-1 rounded-full font-semibold transition-colors duration-200 text-sm focus:outline-none ${
                    loginType === type.value
                      ? "bg-[var(--ires-red)] text-white"
                      : "bg-gray-100 dark:bg-[var(--ires-black)] text-gray-700 dark:text-gray-200"
                  }`}
                  onClick={() => setLoginType(type.value)}
                  type="button"
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <div>
              {loginType === "admin" && <AdminLoginForm />}
              {loginType === "agent" && <AgentLoginForm />}
              {loginType === "responder" && <ResponderLoginForm />}
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden md:flex flex-1 items-center justify-center bg-transparent p-8">
            <img
              src={securityLaptop}
              alt="Security Laptop"
              className="max-w-full h-auto"
            />
          </div>

          {/* Mobile: Image below form */}
          <div className="flex md:hidden items-center justify-center bg-transparent p-8">
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
