import { useContext } from "react";
import SunIcon from "../../../shared/assets/icons/sun.svg";
import MoonIcon from "../../../shared/assets/icons/moon.svg";
import { ThemeContext } from "@/shared/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 transition duration-300
        ${
          isDark
            ? "bg-iresNavyBlue text-iresWhite"
            : "bg-iresWhite text-iresNavyBlue"
        }
        border-iresRed`}
    >
      <img
        src={isDark ? SunIcon : MoonIcon}
        alt="Theme icon"
        className="w-5 h-5"
      />
    </button>
  );
};

export default ThemeToggle;
