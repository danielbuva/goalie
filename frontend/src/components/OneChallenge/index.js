import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Avatar from "../Avatar";
import "./OneChallenge.css";
import { JoinChallenge, getAllChallenges } from "../../store/challenges";

export default function OneChallenge() {
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  console.log(challengeId);
  let challenges = useSelector((state) => state.challenges.challenges);
  let challenge = challenges.find((item) => item.id == challengeId);

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch, challengeId]);

  let joinClicker = () => {
    dispatch(JoinChallenge(challengeId));
  };

  if (!challenge) return null;

  return (
    <div className="oneChallenge">
      <div className="oneChallenge-header">
        <div>{challenge.title}</div>
        <div>...</div>
      </div>
      <div className="oneChallenge-body">{challenge.body}</div>
      <div className="oneChallenge-footer">
        <div>
          <Avatar />
        </div>
        <div>
          <button className="oneChallenge-join-button" onClick={joinClicker}>
            Join +
          </button>
        </div>
      </div>
    </div>
  );
}
