import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Avatar from "../Avatar";
import "./OneChallenge.css";
import { JoinChallenge, getAllChallenges } from "../../store/challenges";
import useSessionUser from "../../hooks/useSessionUser";
import useChallenge from "../../hooks/useChallenge";
import ChallengeDropDownMenu from "../ChallengeDropDownMenu";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function OneChallenge() {
  const [searchParams, setSearchParams] = useSearchParams();
  let tabType = searchParams.get("type") ?? "In progress";
  // let [tabType, setTabType] = useState(tab);
  console.log("tab", tabType);
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  const user = useSessionUser();
  let challenges = useChallenge();
  let challenge = challenges.find((item) => item.id == challengeId);

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch, challengeId]);

  // useEffect(() => {
  //   tab = searchParams.get("type") ?? "In progress";
  //   setTabType(tab);
  // });

  let joinClicker = () => {
    dispatch(JoinChallenge(challengeId));
  };
  if (!challenge) return null;
  console.log("challenge", challenge.allParticipants);

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId == user.id : false
  );

  let inProgressClicker = () => {
    setSearchParams({ type: "In progress" });
    // setTabType("In progress");
  };

  let completedClicker = () => {
    setSearchParams({ type: "Completed" });
    // setTabType("Completed");
  };

  return (
    <div className="oneChallenge">
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
            <Avatar />
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
          <div onClick={inProgressClicker}>In Progress</div>
          <div onClick={completedClicker}>Completed</div>
        </div>
        <div
          className="oneChallenge-main-tabSlider"
          style={{ left: tabType == "In progress" ? "230px" : "315px" }}
        ></div>
      </div>
    </div>
  );
}
