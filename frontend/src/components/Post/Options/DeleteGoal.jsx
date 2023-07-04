import { useModal } from "../../../hooks/useModal";
import { deleteGoal } from "../../../store/goals";
import { useDispatch } from "react-redux";

import "./Options.css";

function DeleteGoal({ id }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteGoal(id));
    closeModal();
  };
  return (
    <div id="delete-goal">
      <div id="delete-header">
        <p id="delete-text">
          This can’t be undone and it will be removed from your profile,
          the timeline of any accounts that follow you, and from Goal
          search results.
        </p>
      </div>
      <div id="delete-buttons">
        <div
          className="goal-overlay"
          onClick={handleClick}
          style={{ width: "100%" }}
        >
          <button id="delete-confirm">delete</button>
        </div>
        <div id="cancel">
          <div
            className="goal-overlay"
            onClick={closeModal}
            style={{ width: "100%" }}
          >
            <button id="delete-cancel">cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteGoal;
