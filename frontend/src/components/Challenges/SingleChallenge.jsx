import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import "./SingleChallenge.css";

export default function SingleChallenge({ challenge }) {
  const history = useNavigate();
  let singleChallengeClicker = () => {
    history(`/challenges/${challenge.id}`);
  };
  return (
    <div className="challengeWrapper" onClick={singleChallengeClicker}>
      <div>
        <Avatar />
      </div>
      <div className="singelChallenge-text">
        <div className="singelChallenge-text-first">{challenge.title}</div>
        <div className="singelChallenge-text-second">
          {challenge.body.slice(0, 50)}
          {challenge.body.length > 50 ? "..." : null}
        </div>
      </div>
      <div className="singleChallenge-dropdown-wrapper">
        <div className="singleChallenge-dropdown">...</div>
        <div className="singleChallenge-icon-wrapper">
          <i className="fa-regular fa-user"></i>
          {challenge.participants}
        </div>
      </div>
    </div>
  );
}
