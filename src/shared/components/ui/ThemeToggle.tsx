import { useEffect, useState } from "react";
import SunIcon from "../../../shared/assets/icons/sun.svg";
import MoonIcon from "../../../shared/assets/icons/moon.svg";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 transition duration-300
        ${
          theme === "light"
            ? "bg-iresWhite text-iresNavyBlue"
            : "bg-iresNavyBlue text-iresWhite"
        }
        border-iresRed`}
    >
      <img
        src={theme === "light" ? MoonIcon : SunIcon}
        alt="Theme icon"
        className="w-5 h-5"
      />
    </button>
  );
};

export default ThemeToggle;
