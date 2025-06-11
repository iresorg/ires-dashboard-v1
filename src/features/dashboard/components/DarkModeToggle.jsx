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
      className="px-4 py-2 rounded font-semibold border transition duration-300"
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#0C0E5D",
        color: theme === "light" ? "#0C0E5D" : "#ffffff",
        borderColor: "#D10F24",
      }}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default DarkModeToggle;