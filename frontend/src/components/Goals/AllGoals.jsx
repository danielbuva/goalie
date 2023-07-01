import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGoals } from "../../store/goals";
import useGoals from "../../hooks/useGoals";
import Goals from ".";

export default function AllGoals() {
  const dispatch = useDispatch();
  const goals = useGoals();

  console.log("ALL GOALS: ", goals)

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  if (!goals || goals.length <1)return null;

  return <Goals goals={goals} />;
}
