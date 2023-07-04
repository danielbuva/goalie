import { useDispatch, useSelector } from "react-redux";
import { getUsersGoals } from "../../store/goals";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Post from "../Post";

export default function UserGoals() {
  const goals = useSelector((state) => state.goals.usersGoals);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUsersGoals(userId));
  }, [dispatch, userId]);

  if (!goals || goals.length < 1) return null;


  return (
    <div>
      {goals.map((goal, i) => (
        <Post
          key={goal.id}
          title={goal.title}
          doit={goal.doit}
          createdAt={goal.createdAt}
          body={goal.body}
          user={goal.user}
          id={goal.id}
          index={i}
        />
      ))}
    </div>
  );
}
