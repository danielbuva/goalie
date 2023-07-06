import { useLocation, useNavigate } from "react-router-dom";
import ChallengeDropDownMenu from "../ChallengeDropDownMenu";
import Avatar from "../Avatar";
import "./SingleChallenge.css";
import { useSelector } from "react-redux";

export default function SingleChallenge({ challenge }) {
  const history = useNavigate();
  let singleChallengeClicker = () => {
    history(`/challenges/${challenge.id}`);
  };
  const user = useSelector(state=> state.users.user)
  const {pathname: path} = useLocation();

  return (
    <div className="challengeWrapper" onClick={singleChallengeClicker}>
      {!path.includes(user?.id) &&  <Avatar/>}
      <div className="singelChallenge-text">
        <div className="singelChallenge-text-first">{challenge.title}</div>
        <div className="singelChallenge-text-second">
          {challenge.body.slice(0, 50)}
          {challenge.body.length > 50 ? "..." : null}
        </div>
      </div>
      <div className="singleChallenge-dropdown-wrapper">
        <div className="singleChallenge-dropdown">
          <ChallengeDropDownMenu challenge={challenge} />
        </div>
        <div className="singleChallenge-icon-wrapper">
          <i className="fa-regular fa-user"></i>
          {challenge.allParticipants.length}
        </div>
      </div>
    </div>
  );
}
