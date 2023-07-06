import { useSelector } from "react-redux";
import Post from "../Post";

function Accomplished() {
  const goals = useSelector((state) => state.goals.usersGoals);

  const accomplishedGoals = goals.filter((goal) => goal.completed);

  return accomplishedGoals.map((goal, i) => (
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

export default Accomplished;
