import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersGoals } from "../../store/goals";
import Goals from ".";
import { useParams } from "react-router-dom";

export default function UserGoals() {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.goals.usersGoals);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUsersGoals(userId));
  }, [dispatch, userId]);

  if (!goals || goals.length < 1) return null;

  const sortedGoals = goals.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return <Goals goals={sortedGoals} />;
}
