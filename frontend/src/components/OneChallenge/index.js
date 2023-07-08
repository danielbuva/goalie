import { JoinChallenge, getAllChallenges } from "../../store/challenges";
import OneChallengeParticipants from "./OneChallengeParticipants";
import ChallengeDropDownMenu from "../ChallengeDropDownMenu";
import useSessionUser from "../../hooks/useSessionUser";
import SignedOutUserModal from "../SignedOutUserModal";
import { Link, useParams } from "react-router-dom";
import useChallenge from "../../hooks/useChallenge";
import { useSearchParams } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { AccomplishedGoalMark } from "../Post";
import { useDispatch } from "react-redux";
import { useMenu } from "../Menu";
import { useEffect } from "react";
import Avatar from "../Avatar";

import "./OneChallenge.css";

export default function OneChallenge() {
  const [searchParams, setSearchParams] = useSearchParams();
  let tabType = searchParams.get("type") ?? "In progress";
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  const user = useSessionUser();
  const { showModal } = useModal();
  const { toggleMenu } = useMenu();
  let challenges = useChallenge();
  let challenge = challenges.find(
    (item) => item.id === parseInt(challengeId)
  );

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch, challengeId]);

  let joinClicker = () => {
    if (user) {
      dispatch(JoinChallenge(challengeId));
      toggleMenu();
    } else {
      showModal(<SignedOutUserModal />);
    }
  };
  if (!challenge) return null;

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId === user.id : false
  );

  let isCompleted = isParticipant?.completed;

  let inProgressClicker = () => {
    setSearchParams({ type: "In progress" });
  };

  let completedClicker = () => {
    setSearchParams({ type: "Completed" });
  };

  return (
    <div className="oneChallenge">
      <div className="oneChallenge-main-header">
        <div className="oneChallenge-header">
          <div className="oneChallenge-header-title">
            {challenge.title}
            {isCompleted && <AccomplishedGoalMark />}
          </div>
          <ChallengeDropDownMenu challenge={challenge} />
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
          <div style={{ cursor: "pointer" }} onClick={inProgressClicker}>
            In Progress
          </div>
          <div style={{ cursor: "pointer" }} onClick={completedClicker}>
            Completed
          </div>
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
