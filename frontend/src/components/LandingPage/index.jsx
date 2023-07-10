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
          <video autoPlay muted loop src="newgoal-vid.mp4" style={{width: "1000px"}}/>
          <h2>The space to share goals.</h2>
        </div>
        <div className="lp lp-doits">
          <h1>Support your friends' goals with doit.</h1>
          <video autoPlay muted loop src="doit-video.mp4" style={{width: "1000px"}}/>
          <h2>Doits are your way of encouraging fellow users.</h2>
        </div>
        <div className="lp lp-challenges">
          <h1>Create and participate in challenges with one another.</h1>
          <img
            style={{width:"1000px"}}
            alt="Example of Challenges Feature"
            src={ChallengesExample}
          ></img>
          <h2>Categorize your challenges and strive towards the same achievements.</h2>
        </div>
        <div>
          <h1 className="lp">Communities coming soon...</h1>
        </div>
      </div>
    </div>
  );
}
