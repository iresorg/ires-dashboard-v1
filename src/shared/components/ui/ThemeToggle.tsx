import SunIcon from "@/shared/assets/icons/sun.svg?react";
import MoonIcon from "@/shared/assets/icons/moon.svg?react";
import React from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className="w-10 h-10">
      {isDark ? (
        <SunIcon className="w-full h-full object-contain text-yellow-400 drop-shadow" />
      ) : (
        <MoonIcon className="w-full h-full object-contain text-white drop-shadow" />
      )}
    </button>
  );
}
