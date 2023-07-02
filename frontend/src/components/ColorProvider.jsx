import { ThemeContext } from "../hooks/useTheme";
import { useState } from "react";

export function ColorProvider({ children }) {
  const [color, setC] = useState(localStorage.getItem("color") ?? "red");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? "light"
  );

  const setColor = (e) => {
    setC(e.target.value);
    localStorage.setItem("color", e.target.value);
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
      }}
    >
      <div id={theme}>
        <div id={color}>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}
