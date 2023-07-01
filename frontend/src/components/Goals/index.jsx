import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGoals } from "../../store/goals";
import useGoals from "../../hooks/useGoals";
import Post from "../Post";

export default function Goals() {
  const dispatch = useDispatch();
  const goals = useGoals();

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  if (goals.length < 1) return null;

  return (
    <div>
      {goals.map((goal) => (
          <Post
            key={goal.id}
            title={goal.title}
            doit={goal.doit}
            createdAt={goal.createdAt}
            body={goal.body}
            user={goal.user}
          />
        ))}
    </div>
  );
}
