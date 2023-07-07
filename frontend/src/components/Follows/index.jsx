import Avatar from "../Avatar";
import useSessionUser from "../../hooks/useSessionUser";
import "./Follows.css";
import { CreateFollower } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Unfollow } from "../../store/session";
import { Link } from "react-router-dom";

export default function FollowsBox({ user }) {
  let dispatch = useDispatch();
  let currUser = useSessionUser();
  // const profileUser = useSelector((state) => state.users.user);
  const isUser = currUser ? currUser.id === user.id : null;

  const following = currUser
    ? currUser.following.find((follower) => follower.id === user.id)
    : null;

  let followClicker = () => {
    if (following) dispatch(Unfollow(user.id));
    if (!following) dispatch(CreateFollower(user.id));
  };

  return (
    <div className="FollowsList_Wrapper">
      <div>
        <Link to={`/${user.id}`}>
          <Avatar />
        </Link>
      </div>
      <div className="FollowsList_middle_holder">
        <div className="FollowsList_title">
          <Link className="FollowList-Link" to={`/${user.id}`}>
            <div className="FollowList-profile-link">{user.name}</div>
          </Link>
        </div>
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
