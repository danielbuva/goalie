import { Link } from "react-router-dom";
import GoalieLogo from "../GoalieLogo";
import ChallengesExample from "./challenges.png";
import "./index.css";

export default function LandingPage() {
  return (
    <div style={{ height: "100%" }}>
      <nav>
        <GoalieLogo/>
        <Link>Login</Link>
        <Link>Sign Up</Link>
      </nav>
      <div>
        <div className="lp lp-welcome">
          <h1>Welcome to Goaly.</h1>
          <h2>The space to share goals.</h2>
        </div>
        <div className="lp lp-doits">
          <h1>Support your friends' goals with doit.</h1>
        </div>
        <div className="lp lp-challenges">
          <h1>
            Create and participate in challenges with one another.
          </h1>
          <img src={ChallengesExample}></img>
        </div>
        <div>
          <h2 className="lp">Communities coming soon...</h2>
        </div>
      </div>
    </div>
  );
}
