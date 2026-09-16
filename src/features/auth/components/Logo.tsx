// shared/components/ui/Logo.tsx
import { useEffect, useState } from "react";
import logoDark from "@shared/assets/logos/ires-logo-dark.svg";
import logoWhite from "@shared/assets/logos/ires-logo-white.svg";

const Logo = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      setTheme(currentTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <img
      src={theme === "dark" ? logoWhite : logoDark}
      alt="iRES Logo"
      className="h-8 w-auto"
    />
  );
};

export default Logo;
