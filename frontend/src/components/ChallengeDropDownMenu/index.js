import useSessionUser from "../../hooks/useSessionUser";
import useChallenge from "../../hooks/useChallenge";
import { useDispatch } from "react-redux";
import { Menu, MenuItem, useMenu } from "../Menu";
import { useModal } from "../../hooks/useModal";
import { JoinChallenge, LeaveChallenge } from "../../store/challenges";
import Ellipsis from "../icons/Ellipsis";

export default function ChallengeDropDownMenu({ challenge }) {
  const dispatch = useDispatch();
  const user = useSessionUser();
  const challenges = useChallenge();
  const { buttonRef, menuRef, toggleMenu, show, hideMenu } = useMenu();

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId == user.id : false
  );

  let isOwner = user ? challenge.creatorId == user.id : false;

  let editClicker = () => {};

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {/* {isOwner && <div>Edit Challenge</div>}
      {isOwner && <div>Delete Challenge </div>}
      {!isParticipant && <div>Join Challenge</div>}
      {isParticipant && <div>Leave Challenge</div>} */}
      <Ellipsis
        buttonRef={buttonRef}
        onClick={(e) => {
          toggleMenu();
        }}
      />
      <Menu isOpen={show} menuRef={menuRef} right>
        {isOwner && <MenuItem text="Edit" />}
        {isOwner && <MenuItem text="Delete" />}
        {isParticipant ? <MenuItem text="Leave" /> : <MenuItem text="Join" />}
      </Menu>
    </div>
  );
}
