import { useColorMode } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";

import src1 from "./images/404-white.png";
import src2 from "./images/404-dim.png";
import src3 from "./images/404-black.png";

import "./index.css";

export default function PageNotFound() {
  const navigate = useNavigate();

  const src = useColorMode(src1, src2, src3);

  return (
    <div className="page-not-found">
      <h1>Oh no! The page you're looking for doesn't exist.</h1>
      <button onClick={() => navigate("/home")}>Take me back home</button>
      <img
        className="page-not-found-img"
        src={src}
        alt="404 Goaly Goalie"
      />
    </div>
  );
}
