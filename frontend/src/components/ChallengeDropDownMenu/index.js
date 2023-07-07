import useSessionUser from "../../hooks/useSessionUser";
// import useChallenge from "../../hooks/useChallenge";
import { Menu, MenuItem, useMenu } from "../Menu";
import { useModal } from "../../hooks/useModal";
import EditChallengeForm from "./EditChallengeForm";
import { useDispatch } from "react-redux";
import Ellipsis from "../icons/Ellipsis";
import {
  // EditChallenge,
  LeaveChallenge,
  JoinChallenge,
  DeleteChallenge,
  CompleteChallenge,
} from "../../store/challenges";

export default function ChallengeDropDownMenu({ challenge }) {
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const user = useSessionUser();
  // const challenges = useChallenge();
  const { buttonRef, menuRef, toggleMenu, show } = useMenu();

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId === user.id : false
  );

  let isOwner = user ? challenge.creatorId === user.id : false;

  let isCompleted = isParticipant?.completed;

  let joinChallengeClicker = () => {
    dispatch(JoinChallenge(challenge.id));
    toggleMenu();
  };

  let leaveChallengeClicker = () => {
    dispatch(LeaveChallenge(challenge.id, user.id));
    toggleMenu();
  };

  let deleteChallengeClicker = () => {
    dispatch(DeleteChallenge(challenge.id));
    toggleMenu();
  };

  let completeClicker = () => {
    dispatch(
      CompleteChallenge(isParticipant.challengeId, !isCompleted, user.id)
    );
    toggleMenu();
  };

  return (
    <div onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
      <Ellipsis buttonRef={buttonRef} onClick={toggleMenu} />
      <Menu isOpen={show} menuRef={menuRef} right>
        {isOwner && (
          <MenuItem
            text="Edit"
            onClick={() => {
              showModal(<EditChallengeForm challenge={challenge} />);
            }}
          />
        )}
        {isOwner && <MenuItem text="Delete" onClick={deleteChallengeClicker} />}
        {isParticipant ? (
          <MenuItem text="Leave" onClick={leaveChallengeClicker} />
        ) : (
          <MenuItem text="Join" onClick={joinChallengeClicker} />
        )}
        {isParticipant && (
          <MenuItem
            text={isCompleted ? "Mark as incomplete" : "Complete"}
            onClick={completeClicker}
          />
        )}
      </Menu>
    </div>
  );
}
