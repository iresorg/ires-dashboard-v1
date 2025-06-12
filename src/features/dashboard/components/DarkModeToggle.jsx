import { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from "../../../shared/assets/icons/sun.svg";
import { ReactComponent as MoonIcon } from "../../../shared/assets/icons/moon.svg";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded font-semibold border transition duration-300
        ${theme === "light"
          ? "bg-iresWhite text-iresNavyBlue"
          : "bg-iresNavyBlue text-iresWhite"}
        border-iresRed`}
    >
         {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
    </button>
  );
};

export default DarkModeToggle;
