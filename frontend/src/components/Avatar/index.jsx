import pic from "./placeholder-goalie.jpeg";
import "./index.css";

export default function Avatar({
  boxSize = "45px",
  hover = true,
  src,
  ...props
}) {
  return hover ? (
    <div
      className="overlay"
      style={{ width: boxSize, height: boxSize, ...props }}
    >
      <img
        className="profile-pic"
        src={src || pic}
        alt="profile-pic"
        style={{ width: boxSize, height: boxSize }}
      />
    </div>
  ) : (
    <img
      className="profile-pic"
      src={src || pic}
      alt="profile-pic"
      style={{ width: boxSize, height: boxSize, ...props }}
    />
  );
}
