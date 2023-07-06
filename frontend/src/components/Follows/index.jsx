import Avatar from "../Avatar";
import useSessionUser from "../../hooks/useSessionUser";
import "./Follows.css";
import { CreateFollower } from "../../store/challenges";
import { useDispatch } from "react-redux";
import { Unfollow } from "../../store/challenges";

export default function FollowsBox({ user }) {
  let dispatch = useDispatch();
  let currUser = useSessionUser();
  const isUser = currUser ? currUser.id === user.id : null;

  const following = currUser
    ? currUser.following.find((follower) => follower.id === user.id)
    : null;

  let followClicker = () => {
    console.log("follwoing", following);
    if (following) dispatch(Unfollow(user.id));
    if (!following) dispatch(CreateFollower(user.id));
  };

  return (
    <div className="FollowsList_Wrapper">
      <div>
        <Avatar />
      </div>
      <div className="FollowsList_middle_holder">
        <div className="FollowsList_title">{user.name}</div>
        <div className="FollowsList_id">@{user.id}</div>
        <div className="FollowsList_bio">
          {user.bio.slice(0, 30)}
          {user.bio.length > 30 ? "..." : null}
        </div>
      </div>
      {currUser && !isUser && (
        <button className="FollowsList_follow_btn" onClick={followClicker}>
          {following ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}
