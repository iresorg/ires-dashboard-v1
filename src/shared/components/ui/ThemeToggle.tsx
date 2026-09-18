import { useContext } from "react";
import SunIcon from "../../../shared/assets/icons/sun.svg";
import MoonIcon from "../../../shared/assets/icons/moon.svg";
import { ThemeContext } from "@/shared/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className="ui-icon-btn"
    >
      <img
        src={isDark ? SunIcon : MoonIcon}
        alt="Theme icon"
        className="w-4 h-4"
      />
    </button>
  );
};

export default ThemeToggle;
