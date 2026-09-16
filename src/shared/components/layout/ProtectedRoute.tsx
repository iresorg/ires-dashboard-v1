import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { ROUTES } from "@/shared/constants/routes";
import Logo from "@/features/auth/components/Logo";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Wait for auth initialization before making routing decisions
  if (!isInitialized) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-[#12096f] via-[#1e1b4b] to-[#312e81] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 animate-loading-fade">
          {/* Animated Logo */}
          <div className="relative">
            <div className="animate-logo-glow">
              <Logo />
            </div>
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping"></div>
          </div>
          
          {/* Loading text */}
          <div className="text-white/80 text-sm font-medium animate-pulse">
            Initializing...
          </div>
          
          {/* Loading dots */}
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-dot-bounce"></div>
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-dot-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-dot-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
