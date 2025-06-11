import SunIcon from "@/shared/assets/icons/sun.svg?react";
import MoonIcon from "@/shared/assets/icons/moon.svg?react";
import { useContext } from "react";
import { ThemeContext } from "@/shared/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  console.log("ThemeToggle isDark:", isDark);
function calltoggleTheme(){
toggleTheme();
console.log(isDark)
}
  return (
    <button
      key={isDark ? "dark" : "light"}
      onClick={calltoggleTheme}
      className="w-8 h-8 transition-all duration-300"
      aria-label="Toggle Theme"
    >
      <SunIcon className={isDark ? "hidden" : "w-full h-full"} />{" "}
      <MoonIcon className={isDark ? "w-full h-full" : "hidden"} />
    </button>
  );
}
