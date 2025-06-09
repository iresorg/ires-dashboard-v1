import SunIcon from "@/shared/assets/icons/sun.svg?react";
import MoonIcon from "@/shared/assets/icons/moon.svg?react";
import { useContext } from "react";
import { ThemeContext } from "@/shared/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="w-10 h-10">
      {isDark ? (
        <SunIcon className="w-full h-full object-contain text-yellow-400 drop-shadow" />
      ) : (
        <MoonIcon className="w-full h-full object-contain  drop-shadow text-[#958C8C]" />
      )}
    </button>
  );
}
