import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/useModal";
import { DeleteChallenge } from "../../store/challenges";
import "./LeaveChallengeModal.css";
import { useNavigate } from "react-router-dom";

export default function DeleteChallengeModal({ challengeId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useNavigate();

  let deleteChallengeClicker = () => {
    dispatch(DeleteChallenge(challengeId));
    closeModal();
    history("/challenges");
  };

  return (
    <div className="DeleteChallengeModal">
      <div>
        If you delete this challenge you will lost all your participants and
        their completion status, are you sure you want to delete the challenge?
      </div>
      <button style={{ color: "red" }} onClick={deleteChallengeClicker}>
        Delete
      </button>
    </div>
  );
}
