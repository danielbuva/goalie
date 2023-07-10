import { JoinChallenge, getAllChallenges } from "../../store/challenges";
import OneChallengeParticipants from "./OneChallengeParticipants";
import ChallengeDropDownMenu from "../ChallengeDropDownMenu";
import useSessionUser from "../../hooks/useSessionUser";
import SignedOutUserModal from "../SignedOutUserModal";
import { Link, useParams } from "react-router-dom";
import useChallenge from "../../hooks/useChallenge";
import { useColorMode } from "../../hooks/useTheme";
import { useSearchParams } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { AccomplishedGoalMark } from "../Post";
import { useDispatch, useSelector } from "react-redux";
import { useMenu } from "../Menu";
import { useEffect } from "react";
import Avatar from "../Avatar";
import displaySelectedIcon from "../../hooks/useIcons";

import "./OneChallenge.css";
import { getUser } from "../../store/users";

export default function OneChallenge() {
  const [searchParams, setSearchParams] = useSearchParams();
  let tabType = searchParams.get("type") ?? "In progress";
  let { challengeId } = useParams();
  const dispatch = useDispatch();
  const user = useSessionUser();
  const { showModal } = useModal();
  const { toggleMenu } = useMenu();
  let challenges = useChallenge();
  let challenge = challenges.find((item) => item.id === parseInt(challengeId));
  let challengeCreator = useSelector(state=> state.users.user)

  useEffect(() => {
    dispatch(getAllChallenges());
    dispatch(getUser(challenge?.creatorId))
  }, [dispatch, challenge?.creatorId]);

  let joinClicker = () => {
    if (user) {
      dispatch(JoinChallenge(challengeId));
      toggleMenu();
    } else {
      showModal(<SignedOutUserModal />);
    }
  };

  const textColor = useColorMode("#536471", "#8b98a5", "#71767b");

  if (!challenge) return (<div>No Challenge Found</div>);
  if (!challengeCreator) return null;

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId === user?.id : false
  );

  let isCompleted = isParticipant?.completed;

  let inProgressClicker = () => {
    setSearchParams({ type: "In progress" });
  };

  let completedClicker = () => {
    setSearchParams({ type: "Completed" });
  };

  const inProgressStyle =
    tabType === "In progress" ? undefined : { color: textColor };

  const completedStyle =
    tabType !== "In progress" ? undefined : { color: textColor };

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
          <div style={{ display: "flex" }}>
            <Link to={`/${challenge.creatorId}`}>
              <Avatar src={challengeCreator?.image}/>
            </Link>
            <div className="oneChallenge-icon">
              {displaySelectedIcon(challenge.image)}
            </div>
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
          <div
            className="oneChallenge-tab"
            onClick={inProgressClicker}
            style={inProgressStyle}
          >
            In Progress
          </div>
          <div
            className="oneChallenge-tab"
            onClick={completedClicker}
            style={completedStyle}
          >
            Completed
          </div>
        </div>
        <div
          className="oneChallenge-main-tabSlider"
          style={{ left: tabType === "In progress" ? "121px" : "423px" }}
        />
      </div>
      <OneChallengeParticipants
        type={tabType !== "In progress"}
        challenge={challenge}
      />
    </div>
  );
}
