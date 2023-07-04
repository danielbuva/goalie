import useSessionUser from "../../hooks/useSessionUser";
import useChallenge from "../../hooks/useChallenge";
import { Menu, MenuItem, useMenu } from "../Menu";
import { useDispatch } from "react-redux";
import Ellipsis from "../icons/Ellipsis";

export default function ChallengeDropDownMenu({ challenge }) {
  const dispatch = useDispatch();
  const user = useSessionUser();
  const challenges = useChallenge();
  const { buttonRef, menuRef, toggleMenu, show } = useMenu();

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId == user.id : false
  );

  let isOwner = user ? challenge.creatorId == user.id : false;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: "relative" }}
    >
      <Ellipsis buttonRef={buttonRef} onClick={toggleMenu} />
      <Menu isOpen={show} menuRef={menuRef} right>
        {isOwner && <MenuItem text="Edit" />}
        {isOwner && <MenuItem text="Delete" />}
        {isParticipant ? (
          <MenuItem text="Leave" />
        ) : (
          <MenuItem text="Join" />
        )}
      </Menu>
    </div>
  );
}
