import { useContext } from "react";
import SunIcon from "../../../shared/assets/icons/sun.svg";
import MoonIcon from "../../../shared/assets/icons/moon.svg";
import { ThemeContext } from "@/shared/ThemeContext";
import Tooltip from "@/shared/components/ui/Tooltip";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip content={label}>
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={label}
        className="ui-icon-btn"
      >
        <img
          src={isDark ? SunIcon : MoonIcon}
          alt=""
          className="w-4 h-4"
        />
      </button>
    </Tooltip>
  );
};

export default ThemeToggle;
