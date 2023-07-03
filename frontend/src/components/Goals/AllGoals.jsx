import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGoals } from "../../store/goals";
import useGoals from "../../hooks/useGoals";
import Goals from ".";

export default function AllGoals() {
  const dispatch = useDispatch();
  const goals = useGoals();

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  if (!goals || goals.length < 1) return null;

  const sortedGoals = goals.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return <Goals goals={sortedGoals} />;
}
