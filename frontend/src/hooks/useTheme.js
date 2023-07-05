import { createContext, useContext } from "react";

export const ThemeContext = createContext(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "Theme.* component muse be rendered as a child of Tile component"
    );
  }
  return context;
}

export function useColorMode(lightColor, darkColor, blackColor) {
  const { theme } = useTheme();
  if (!blackColor) {
    return theme === "light" ? lightColor : darkColor;
  } else {
    return theme === "light"
      ? lightColor
      : theme === "dim"
      ? darkColor
      : blackColor;
  }
}
