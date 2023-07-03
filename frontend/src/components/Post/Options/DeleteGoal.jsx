import { useDispatch } from "react-redux";
import { deleteGoal } from "../../../store/goals";
import { useModal } from "../../../hooks/useModal";

function DeleteGoal({ id }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteGoal(id));
    closeModal();
  };
  return (
    <>
      <button onClick={handleClick}>delete</button>
      <button onClick={closeModal}>cancel</button>
    </>
  );
}

export default DeleteGoal;
