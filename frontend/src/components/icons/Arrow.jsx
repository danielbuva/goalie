function Arrow({ dir, disabled }) {
  return (
    <svg
      width="20px"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        transform: dir === "right" ? "scaleX(-1)" : undefined,
        opacity: disabled ? 0.3 : 1,
      }}
    >
      <g>
        <path
          className="icon"
          d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"
        ></path>
      </g>
    </svg>
  );
}

export default Arrow;
