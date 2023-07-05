import { ThemeContext } from "../hooks/useTheme";
import { useState } from "react";

const COLORS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "pink",
];

export function ColorProvider({ children }) {
  const initialColIndex = localStorage.getItem("color") ?? "0";
  const [color, setC] = useState(parseInt(initialColIndex) ?? 0);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? "light"
  );

  const setColor = (e) => {
    setC(e.target.value);
    localStorage.setItem("color", e.target.value);
  };

  const toggleMode = () => {
    if (theme === "light") {
      setTheme("dim");
    }
    if (theme === "dim") {
      setTheme("black");
    }
    if (theme === "black") {
      setTheme("light");
    }
  };

  const setToLightMode = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  const setToDimMode = () => {
    setTheme("dim");
    localStorage.setItem("theme", "dim");
  };

  const setToBlackMode = () => {
    setTheme("black");
    localStorage.setItem("theme", "black");
  };

  return (
    <ThemeContext.Provider
      value={{
        color,
        setColor,
        setToBlackMode,
        setToDimMode,
        setToLightMode,
        theme,
        toggleMode,
      }}
    >
      <div id={theme}>
        <div id={COLORS[color]}>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}
