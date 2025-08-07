import { RouterProvider } from 'react-router-dom';
import { router } from '@/shared/routes';
import '@/shared/App.css';
import { ThemeProvider } from '@/shared/ThemeContext';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import Logo from '@/features/auth/components/Logo';

function App() {
  const { initializeAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state on app start
    const initApp = async () => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        // Add a small delay for smooth transition
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    initApp();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-[#12096f] via-[#1e1b4b] to-[#312e81] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6 animate-loading-fade">
          {/* Animated Logo */}
          <div className="relative">
            <div className="animate-logo-glow">
              <Logo />
            </div>
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-ping"></div>
          </div>
          
          {/* Loading text */}
          <div className="text-white/80 text-lg font-medium animate-pulse">
            Loading iRES...
          </div>
          
          {/* Loading dots */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-dot-bounce"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-dot-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-dot-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
