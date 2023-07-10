import ChallengesExample from "./challenges.png";
import { useModal } from "../../hooks/useModal";
import GoalieLogo from "../GoalieLogo";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";

import "./index.css";

export default function LandingPage() {
  const { showModal } = useModal();

  return (
    <div>
      <div id="lp-nav-container">
        <nav id="lp-nav">
          <GoalieLogo />
          <div id="lp-auth">
            <p onClick={() => showModal(<LoginForm reroute />)}>Login</p>
            <p onClick={() => showModal(<SignupForm reroute />)}>
              Sign Up
            </p>
          </div>
        </nav>
      </div>
      <div>
        <div className="lp lp-welcome">
          <h1>Welcome to Goaly.</h1>
          <h2>The space to share goals.</h2>
        </div>
        <div className="lp lp-doits">
          <h1>Support your friends' goals with doit.</h1>
          <iframe title="doit-gif" src="https://giphy.com/embed/MmzC6vvqv79BPrXzHj" width="1000" height="475" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        </div>
        <div className="lp lp-challenges">
          <h1>Create and participate in challenges with one another.</h1>
          <img
            style={{width:"1000px", height:"700px"}}
            alt="Example of Challenges Feature"
            src={ChallengesExample}
          ></img>
        </div>
        <div>
          <h2 className="lp">Communities coming soon...</h2>
        </div>
      </div>
    </div>
  );
}
