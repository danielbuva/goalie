import { useTheme } from "../../hooks/useTheme";
import src1 from "./404-white.png"
import src2 from "./404-black.png"
import src3 from "./404-dim.png"
import { useNavigate } from "react-router-dom";
import "./index.css"

export default function PageNotFound() {
    const {theme} = useTheme();
    const navigate = useNavigate();

    const src = theme==='light' ? src1 : theme ==='black' ? src2 : src3

  return (
    <div className="page-not-found">
      <h1>Oh no! The page you're looking for doesn't exist.</h1>
      <button onClick={()=>navigate('/home')}>Take me back home</button>
      <img className="page-not-found-img" src={src}/>
    </div>
  );
}
