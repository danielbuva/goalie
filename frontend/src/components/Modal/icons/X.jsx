import { useTheme } from "../../../hooks/useTheme";

function CloseX() {
  const { theme } = useTheme();
  const stroke = theme === "light" ? "#0f1419" : "#e7e9ea";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{
        position: "relative",
        top: "10",
        height: "16px",
        width: "16px",
        stroke,
        strokeWidth: 3,
      }}
    >
      <path d="m6 6 20 20M26 6 6 26"></path>
    </svg>
  );
}

export default CloseX;
