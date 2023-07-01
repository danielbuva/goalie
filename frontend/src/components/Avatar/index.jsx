import "./index.css";
import pic from "./placeholder-goalie.jpeg";

export default function Avatar({ boxSize = "45px", src = pic }) {
  return (
    <img
      className="profile-pic"
      src={src}
      alt="profile-pic"
      style={{ width: boxSize, height: boxSize }}
    />
  );
}
