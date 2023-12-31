import "./Ellipsis.css";

function Ellipsis({ onClick, buttonRef }) {
  return (
    <svg id="Ellipsis"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="5"
      viewBox="0 0 16 5"
      fill="none"
      onClick={onClick}
      style={{ cursor: "pointer", padding: "15px 10px", borderRadius: "30%" }}
      ref={buttonRef}
    >
      <circle
        className="icon"
        cx="2.46048"
        cy="2.48514"
        r="1.87796"
      />
      <circle
        className="icon"
        cx="8.23148"
        cy="2.50125"
        r="1.87796"
      />
      <circle
        className="icon"
        cx="13.7608"
        cy="2.48514"
        r="1.87796"
      />
    </svg>
  );
}

export default Ellipsis;
