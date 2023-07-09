import { useParams } from "react-router-dom";
import { getUser } from "../../store/users";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import FollowsBox from "../Follows";
import { useEffect } from "react";

export default function FollowsTabs({ followers }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (!user) return null;

  const arr = followers ? user.followers : user.following;

  return (
    <div style={{ paddingTop: "55px" }}>
      {arr.map((follow) => (
        <FollowsBox key={follow.id} user={follow} />
      ))}
    </div>
  );
}
