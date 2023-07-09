import useSessionUser from "../../hooks/useSessionUser";
// import useChallenge from "../../hooks/useChallenge";
import { Menu, MenuItem, useMenu } from "../Menu";
import { useModal } from "../../hooks/useModal";
import EditChallengeForm from "./EditChallengeForm";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Ellipsis from "../icons/Ellipsis";
import {
  // EditChallenge,
  JoinChallenge,
  CompleteChallenge,
} from "../../store/challenges";
import SignedOutUserModal from "../SignedOutUserModal";
import LeaveChallengeModal from "./LeaveChallengeModal";
import DeleteChallengeModal from "./DeleteChallengeModal";

export default function ChallengeDropDownMenu({ challenge }) {
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const history = useNavigate();
  const user = useSessionUser();
  // const challenges = useChallenge();
  const { buttonRef, menuRef, toggleMenu, show } = useMenu();

  let isParticipant = challenge.allParticipants.find((participant) =>
    user ? participant.userId === user.id : false
  );

  let isOwner = user ? challenge.creatorId === user.id : false;

  let isCompleted = isParticipant?.completed;

  let joinChallengeClicker = () => {
    if (user) {
      dispatch(JoinChallenge(challenge.id));
      toggleMenu();
    } else {
      showModal(<SignedOutUserModal />);
    }
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
              toggleMenu();
              showModal(<EditChallengeForm challenge={challenge} />);
            }}
          />
        )}
        {isOwner && (
          <MenuItem
            text="Delete"
            onClick={() => {
              toggleMenu();
              showModal(<DeleteChallengeModal challengeId={challenge.id} />);
              history("/challenges")
            }}
          />
        )}
        {isParticipant ? (
          <MenuItem
            text="Leave"
            onClick={() => {
              toggleMenu();
              showModal(
                <LeaveChallengeModal
                  challengeId={challenge.id}
                  userId={user.id}
                />
              );
            }}
          />
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
