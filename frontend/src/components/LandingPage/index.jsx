import useSessionUser from "../../hooks/useSessionUser";
import ChallengesExample from "./challenges.png";
import { useModal } from "../../hooks/useModal";
import GoalieLogo from "../GoalieLogo";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";

import "./index.css";

export default function LandingPage({ currentUser }) {
  const { showModal } = useModal();
  // const currentUser = useSessionUser();
  console.log(currentUser);

  return (
    <div>
      <div id="lp-nav-container">
        <nav id="lp-nav">
          <GoalieLogo />
          {!currentUser && (
            <div id="lp-auth">
              <p onClick={() => showModal(<LoginForm reroute />)}>Login</p>
              <p onClick={() => showModal(<SignupForm reroute />)}>
                Sign Up
              </p>
            </div>
          )}
        </nav>
      </div>
      <div>
        <div className="lp lp-welcome">
          <h1>Welcome to Goaly.</h1>
          <h2>The space to share goals.</h2>
        </div>
        <div className="lp lp-doits">
          <h1>Support your friends' goals with doit.</h1>
        </div>
        <div className="lp lp-challenges">
          <h1>Create and participate in challenges with one another.</h1>
          <img
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
