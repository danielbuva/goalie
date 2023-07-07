import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Avatar from "../Avatar";
import "./OneChallenge.css";
import { JoinChallenge, getAllChallenges } from "../../store/challenges";
import useSessionUser from "../../hooks/useSessionUser";
import useChallenge from "../../hooks/useChallenge";
import ChallengeDropDownMenu from "../ChallengeDropDownMenu";
import { useSearchParams } from "react-router-dom";
import OneChallengeParticipants from "./OneChallengeParticipants";

export default function OneChallenge() {
  const [searchParams, setSearchParams] = useSearchParams();
  let tabType = searchParams.get("type") ?? "In progress";
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  const user = useSessionUser();
  let challenges = useChallenge();
  let challenge = challenges.find((item) =>  item.id === parseInt(challengeId));

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch, challengeId]);

  let joinClicker = () => {
    dispatch(JoinChallenge(challengeId));
  };
  if (!challenge) return null;

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId === user.id : false
  );

  let inProgressClicker = () => {
    setSearchParams({ type: "In progress" });
  };

  let completedClicker = () => {
    setSearchParams({ type: "Completed" });
  };

  return (
    <div className="oneChallenge" >
      <div className="oneChallenge-main-header">
        <div className="oneChallenge-header">
          <div>{challenge.title}</div>
          <div>
            <ChallengeDropDownMenu challenge={challenge} />
          </div>
        </div>
        <div className="oneChallenge-body">{challenge.body}</div>
        <div className="oneChallenge-footer">
          <div>
            <Link to={`/${challenge.creatorId}`}>
              <Avatar />
            </Link>
          </div>
          <div>
            {!isParticipant && (
              <button
                className="oneChallenge-join-button"
                onClick={joinClicker}
              >
                Join +
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="oneChallenge-main-tabs-wrapper">
        <div className="oneChallenge-main-participants">
          Participants {challenge.allParticipants.length}
        </div>
        <div className="oneChallenge-main-tabs">
          <div style={{cursor:"pointer"}} onClick={inProgressClicker}>In Progress</div>
          <div style={{cursor:"pointer"}} onClick={completedClicker}>Completed</div>
        </div>
        <div
          className="oneChallenge-main-tabSlider"
          style={{ left: tabType === "In progress" ? "230px" : "315px" }}
        ></div>
      </div>
      <div className="">
        <OneChallengeParticipants
          type={tabType !== "In progress"}
          challenge={challenge}
        />
      </div>
    </div>
  );
}
