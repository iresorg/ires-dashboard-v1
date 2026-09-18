import React from "react";
import { ThemeProvider } from "@shared/ThemeContext";
import ThemeToggle from "@shared/components/ui/ThemeToggle";
import LoginForm from "@features/auth/components/LoginForm";
import securityLaptop from "@shared/assets/images/security-laptop.png";
import Logo from "../components/Logo";

const LoginPage: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="h-screen flex overflow-hidden bg-[#F4F6FB] text-[var(--ires-dark-blue)]">
        <div className="flex-1 flex flex-col min-w-0 bg-[#F4F6FB]">
          <div className="flex items-center justify-between px-8 py-5">
            <Logo variant="dark" />
            <ThemeToggle />
          </div>

          <div className="flex-1 flex items-center justify-center px-6 pb-10 overflow-y-auto">
            <LoginForm />
          </div>
        </div>

        <div className="hidden md:flex w-[46%] relative bg-[var(--ires-navy-blue)] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(209,15,36,0.22),transparent_42%),radial-gradient(circle_at_80%_80%,rgba(25,91,255,0.18),transparent_40%)]" />
          <div className="relative z-10 max-w-md px-10 text-center">
            <img
              src={securityLaptop}
              alt="Security operations"
              className="max-w-full max-h-[52vh] object-contain mx-auto mb-8 drop-shadow-2xl"
            />
            <p className="text-white/55 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
              Incident response
            </p>
            <h2 className="text-white text-2xl font-semibold leading-snug">
              Monitor, assign, and resolve incidents from one command center.
            </h2>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
