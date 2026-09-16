import React from "react";
import { ThemeProvider } from "@shared/ThemeContext";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import LoginForm from "@features/auth/components/LoginForm";
import securityLaptop from "@shared/assets/images/security-laptop.png";
import Logo from "../components/Logo";

const LoginPage: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0">
          <div className="flex items-center">
            <Logo />
          </div>
          <div>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden px-4 max-h-full">
            {/* Left: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 py-8 md:py-0 overflow-auto">
              <LoginForm />
            </div>

            {/* Vertical Divider */}
            <div className="hidden md:flex items-center">
              <div className="h-100 w-px bg-customPink dark:bg-gray-700 mx-4" />
            </div>

            {/* Right: Image */}
            <div className="hidden md:flex flex-1 items-center justify-center bg-transparent p-8 overflow-hidden">
              <img
                src={securityLaptop}
                alt="Security Laptop"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
