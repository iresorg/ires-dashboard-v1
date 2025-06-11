import { useEffect, useState } from "react";

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
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default DarkModeToggle;
