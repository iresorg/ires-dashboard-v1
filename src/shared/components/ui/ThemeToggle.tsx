import SunIcon from "@/shared/assets/icons/sun.svg?react";
import MoonIcon from "@/shared/assets/icons/moon.svg?react";
import { useContext } from "react";
import { ThemeContext } from "@/shared/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <SunIcon className="w-full h-full text-yellow-400" />
      ) : (
        <MoonIcon className="w-full h-full text-gray-600" />
      )}
    </button>
  );
}
