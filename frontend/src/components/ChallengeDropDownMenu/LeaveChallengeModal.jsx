import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/useModal";
import { LeaveChallenge } from "../../store/challenges";
import "./LeaveChallengeModal.css";

export default function LeaveChallengeModal({ challengeId, userId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  let leaveChallengeClicker = () => {
    dispatch(LeaveChallenge(challengeId, userId));
    closeModal();
  };

  return (
    <div className="LeaveChallengeModal">
      <div>
        Leaving a challenge will reset your progression, are you sure you want
        to leave?
      </div>
      <button style={{ color: "red" }} onClick={leaveChallengeClicker}>
        Leave
      </button>
    </div>
  );
}
