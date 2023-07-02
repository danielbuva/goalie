import pic from "./placeholder-goalie.jpeg";
import "./index.css";

export default function Avatar({
  boxSize = "45px",
  hover = true,
  src = pic,
}) {
  return hover ? (
    <div className="overlay" style={{ width: boxSize, height: boxSize }}>
      <img
        className="profile-pic"
        src={src}
        alt="profile-pic"
        style={{ width: boxSize, height: boxSize }}
      />
    </div>
  ) : (
    <img
      className="profile-pic"
      src={src}
      alt="profile-pic"
      style={{ width: boxSize, height: boxSize }}
    />
  );
}
