import { ThemeContext } from "../hooks/useTheme";
import { useState } from "react";

export function ColorProvider({ children }) {
  const [color, setColor] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ?? "light"
  );

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
      <div id={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
