import useSessionUser from "../../hooks/useSessionUser";
import { CreateFollower } from "../../store/session";
import { Unfollow } from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

import "./Follows.css";

export default function FollowsBox({ user }) {
  let dispatch = useDispatch();
  let currUser = useSessionUser();
  const isNotUser = currUser?.id !== user.id;

  const following = currUser?.following.find(
    (follower) => follower.id === user.id
  );

  let handleClick = () => {
    if (following) {
      dispatch(Unfollow(user.id));
    } else {
      dispatch(CreateFollower(user.id));
    }
  };

  return (
    <div className="FollowsList_Wrapper">
      <Link to={`/${user.id}`} className="follow-list-user">
        <Avatar src={user.image} />
        <div className="FollowsList_middle_holder">
          <div className="FollowList-profile-link">{user.name}</div>
          <div className="FollowsList_id">@{user.id}</div>
          <div className="FollowsList_bio">{user.bio}</div>
        </div>
      </Link>
      {currUser && isNotUser && (
        <button className="FollowsList_follow_btn" onClick={handleClick}>
          {following ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}
