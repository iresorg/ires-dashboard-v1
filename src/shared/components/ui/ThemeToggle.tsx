import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full border transition duration-300
        ${
          theme === "light"
            ? "bg-iresWhite text-iresNavyBlue"
            : "bg-iresNavyBlue text-iresWhite"
        }
        border-iresRed`}
    >
      <img
        src={theme === "light" ? "" : ""}
        alt={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        className="w-6 h-6"
      />
    </button>
  );
};

export default DarkModeToggle;
