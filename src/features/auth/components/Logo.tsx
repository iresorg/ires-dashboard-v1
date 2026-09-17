import { useEffect, useState } from "react";
import logoDark from "@shared/assets/logos/ires-logo-dark.svg";
import logoWhite from "@shared/assets/logos/ires-logo-white.svg";

interface LogoProps {
  variant?: "auto" | "light" | "dark";
  className?: string;
}

const Logo = ({ variant = "auto", className = "h-8 w-auto" }: LogoProps) => {
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

  const src =
    variant === "light"
      ? logoWhite
      : variant === "dark"
        ? logoDark
        : theme === "dark"
          ? logoWhite
          : logoDark;

  return <img src={src} alt="iRES Logo" className={className} />;
};

export default Logo;
