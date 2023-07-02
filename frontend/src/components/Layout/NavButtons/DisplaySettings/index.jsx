import { useState } from "react";
import "./DisplaySettings.css";
import { useTheme } from "../../../../hooks/useTheme";

function DisplaySettings() {
  const [color, setColor] = useState("");
  // const [theme, setTheme] = useState("");

  const { setToLightMode, setToBlackMode, theme } = useTheme();

  const handleColorPick = (e) => {
    setColor(e.target.value);
  };

  // const handleThemePick = (e) => {
  //   setTheme(e.target.value);
  // };

  return (
    <>
      <div>
        <label>
          <input
            type="radio"
            onChange={handleColorPick}
            checked={color === "red"}
            value="red"
          />
          red
        </label>
        <label>
          <input
            type="radio"
            onChange={handleColorPick}
            checked={color === "orange"}
            value="orange"
          />
          orange
        </label>
        <label>
          <input
            type="radio"
            onChange={handleColorPick}
            checked={color === "yellow"}
            value="yellow"
          />
          yellow
        </label>
        <label>
          <input
            type="radio"
            onChange={handleColorPick}
            checked={color === "green"}
            value="green"
          />
          green
        </label>
        <label>
          <input
            type="radio"
            onChange={handleColorPick}
            checked={color === "blue"}
            value="blue"
          />
          blue
        </label>
        <label>
          <input
            type="radio"
            onChange={handleColorPick}
            checked={color === "purple"}
            value="purple"
          />
          purple
        </label>
        <label>
          <input
            type="radio"
            onChange={handleColorPick}
            checked={color === "pink"}
            value="pink"
          />
          pink
        </label>
      </div>
      <div id="theme-options">
        <label className="theme-choice">
          <input
            className="theme-radio"
            type="radio"
            // onChange={handleThemePick}
            onClick={setToLightMode}
            checked={theme === "light"}
            value="light"
          />
          light
        </label>
        <label className="theme-choice">
          <input
            className="theme-radio"
            type="radio"
            // onChange={handleThemePick}
            checked={theme === "dim"}
            value="dim"
          />
          dim
        </label>
        <label className="theme-choice">
          <input
            className="theme-radio"
            type="radio"
            // onChange={handleThemePick}
            onClick={setToBlackMode}
            checked={theme === "black"}
            value="black"
          />
          black
        </label>
      </div>
    </>
  );
}

export default DisplaySettings;
