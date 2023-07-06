import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import FollowsBox from "../Follows";
import { useEffect } from "react";
import { getUser } from "../../store/users";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./FollowsTabs.css";

export default function FollowsTabs() {
  let [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  let type = searchParams.get("type") ?? "followers";
  const user = useSelector((state) => state.users.user);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  let followersClicker = () => {
    setSearchParams({ type: "followers" });
    if (user) {
      dispatch(getUser(user.id));
    }
  };

  let followingsClicker = () => {
    setSearchParams({ type: "followings" });
    if (user) {
      dispatch(getUser(user.id));
    }
  };

  if (!user) return null;

  let arr = type === "followers" ? user.followers : user.following;

  return (
    <div>
      <div className="FollowsTabs-text-holder">
        <div className="FollowsTabs-name">{user.name}</div>
        <div className="FollowsTabs-id">@{user.id}</div>
      </div>
      <div className="FollowsTabs-nav">
        <div onClick={followersClicker}>Followers</div>
        <div onClick={followingsClicker}>Following</div>
      </div>
      <div>
        {arr.map((follow) => (
          <FollowsBox user={follow} />
        ))}
      </div>
    </div>
  );
}
