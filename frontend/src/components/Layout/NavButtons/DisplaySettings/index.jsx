import { useTheme } from "../../../../hooks/useTheme";
import "./DisplaySettings.css";

function DisplaySettings() {
  const { color, setColor, setToLightMode, setToBlackMode, theme } =
    useTheme();
  const colors = [
    { red: "#ef3e2e" },
    { orange: "#ff7a00" },
    { yellow: "#ffd400" },
    { green: "#acfc3c" },
    { blue: "#222da1" },
    { purple: "#7856ff" },
    { pink: "#ff86e0" },
  ];

  return (
    <>
      <div id="color-options">
        {colors.map((col) => {
          const key = Object.keys(col)[0];
          return (
            <div className="radio-container" key={key}>
              <input
                type="radio"
                id={key}
                name={key}
                onChange={setColor}
                checked={color === key}
                value={key}
              />
              <label htmlFor={key} style={{ backgroundColor: col[key] }}>
                {color === key && (
                  <span className="checkmark">&#10003;</span>
                )}
              </label>
            </div>
          );
        })}
      </div>
      <div id="theme-options">
        <label className="theme-choice">
          <input
            className="theme-radio"
            type="radio"
            name="light"
            onChange={setToLightMode}
            checked={theme === "light"}
            value="light"
          />
          <label htmlFor="light" />
          light
        </label>
        {/* <label className="theme-choice">
          <input
            className="theme-radio"
            type="radio"
            checked={theme === "dim"}
            value="dim"
          />
          dim
        </label> */}
        <label className="theme-choice">
          <input
            className="theme-radio"
            type="radio"
            name="black"
            onChange={setToBlackMode}
            checked={theme === "black"}
            value="black"
          />
          <label htmlFor="black" />
          black
        </label>
      </div>
    </>
  );
}

export default DisplaySettings;
