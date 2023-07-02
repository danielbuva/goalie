import { useTheme } from "../../../../hooks/useTheme";
import "./DisplaySettings.css";

const COLORS = [
  { red: "#ef3e2e" },
  { orange: "#ff7a00" },
  { yellow: "#ffd400" },
  { green: "#acfc3c" },
  { blue: "#222da1" },
  { purple: "#7856ff" },
  { pink: "#ff86e0" },
];

function DisplaySettings() {
  const {
    color,
    setColor,
    setToLightMode,
    setToBlackMode,
    setToDimMode,
    theme,
  } = useTheme();

  const currColor = Object.keys(COLORS[color])[0];
  const isLightMode = theme === "light";
  const isDimMode = theme === "dim";
  const isBlackMode = theme === "black";
  const border = `solid 2px ${COLORS[color][currColor]}`;

  return (
    <>
      <div id="color-options">
        {COLORS.map((col, i) => {
          const key = Object.keys(col)[0];
          const checked = currColor === key;
          return (
            <div className="radio-container" key={key}>
              <input
                type="radio"
                id={key}
                name={key}
                onChange={setColor}
                checked={checked}
                value={i}
              />
              <label htmlFor={key} style={{ backgroundColor: col[key] }}>
                {checked && <span className="checkmark">&#10003;</span>}
              </label>
            </div>
          );
        })}
      </div>
      <div id="theme-options">
        <label
          className="theme-choice"
          id="light-mode"
          style={{ border: isLightMode ? border : undefined }}
        >
          <div className="theme-check">
            <input
              className="theme-radio"
              type="radio"
              name="light"
              onChange={setToLightMode}
              checked={theme === "light"}
              value="light"
            />
            <span className="check">&#10003;</span>
          </div>
          light
        </label>
        <label
          className="theme-choice"
          id="dim-mode"
          style={{ border: isDimMode ? border : undefined }}
        >
          <div className="theme-check">
            <input
              className="theme-radio"
              type="radio"
              onChange={setToDimMode}
              checked={theme === "dim"}
              value="dim"
            />
            <span className="check">&#10003;</span>
          </div>
          dim
        </label>
        <label
          className="theme-choice"
          id="black-mode"
          style={{ border: isBlackMode ? border : undefined }}
        >
          <div className="theme-check">
            <input
              className="theme-radio"
              type="radio"
              name="black"
              onChange={setToBlackMode}
              checked={theme === "black"}
              value="black"
            />
            <span className="check">&#10003;</span>
          </div>
          black
        </label>
      </div>
    </>
  );
}

export default DisplaySettings;
