import { getAllGoals } from "../../store/goals";
import useGoals from "../../hooks/useGoals";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Post from "../Post";

export default function AllGoals() {
  const dispatch = useDispatch();
  const goals = useGoals();

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  if (!goals || goals.length < 1) return null;

  return goals.map((goal, i) => (
    <Post
      key={goal.id}
      title={goal.title}
      doit={goal.doit}
      createdAt={goal.createdAt}
      body={goal.body}
      user={goal.user}
      id={goal.id}
      index={i}
      status={goal.completed}
    />
  ));
}
