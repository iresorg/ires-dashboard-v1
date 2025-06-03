import { ReactComponent as SunIcon } from "@/assets/icons/sun.svg";
import { ReactComponent as MoonIcon } from "@/assets/icons/moon.svg";
import React from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button onClick={toggleTheme} className="w-10 h-10">
      {isDark ? (
        <SunIcon className="w-full h-full object-contain" />
      ) : (
        <MoonIcon className="w-full h-full object-contain" />
      )}
    </button>
  );
}
