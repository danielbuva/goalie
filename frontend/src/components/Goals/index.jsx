import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllGoals } from "../../store/goals";
import useGoals from "../../hooks/useGoals";
import Post from "../Post";

export default function Goals() {
  const dispatch = useDispatch();
  const goals = useGoals();
  console.log("GOALS: ", goals);

  useEffect(() => {
    dispatch(getAllGoals());
  }, [dispatch]);

  
  return (
    <div>
      {goals.length > 0 &&
        goals.map((goal) => (
          <Post
            key={goal.id}
            title={goal.title}
            doit={goal.doit}
            createdAt={goal.createdAt}
            body={goal.body}
          />
        ))}
    </div>
  );
}
