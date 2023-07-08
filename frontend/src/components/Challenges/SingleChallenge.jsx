import { useLocation, useNavigate } from "react-router-dom";
import ChallengeDropDownMenu from "../ChallengeDropDownMenu";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import "./SingleChallenge.css";
import { AccomplishedGoalMark } from "../Post";
import useSessionUser from "../../hooks/useSessionUser";

export default function SingleChallenge({ challenge }) {
  const history = useNavigate();
  let singleChallengeClicker = () => {
    history(`/challenges/${challenge.id}`);
  };
  const user = useSelector((state) => state.users.user);
  const currentUser = useSessionUser();
  const { pathname: path } = useLocation();

  const isCompleted = challenge.allParticipants.find(
    (participant) =>
      participant.userId === currentUser?.id && participant.completed
  );

  return (
    <div className="challengeWrapper" onClick={singleChallengeClicker}>
      <div style={{ display: "flex", gap: "15px" }}>
        {!path.includes(user?.id) && <Avatar />}
        <div className="singelChallenge-text">
          <div className="singelChallenge-text-first">
            {challenge.title}
            {isCompleted && <AccomplishedGoalMark />}
          </div>
          <div className="singelChallenge-text-second">{challenge.body}</div>
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
