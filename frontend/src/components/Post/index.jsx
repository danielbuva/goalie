import useSessionUser from "../../hooks/useSessionUser";
import { Link, useParams } from "react-router-dom";
import { addDoit, removeDoit } from "../../store/goals";
import { useDispatch } from "react-redux";
import { timeSince } from "../../utils";
import Options from "./Options";
import Avatar from "../Avatar";

import "./Post.css";

export function Post({
  title,
  doit,
  createdAt,
  body,
  user,
  id,
  index,
  status,
}) {
  const { userId } = useParams();

  return (
    <div className="post">
      {!userId && <User user={user} />}

      <div className="post-header">
        <p className="post-title">{title}</p>
        <Options post={{ title, body, id, status }} index={index} />
      </div>

      <div className="post-main">
        <div className="post-body">{body}</div>
        {status && <AccomplishedGoalMark />}
      </div>

      <div className="post-footer">
        <Doit doit={doit} id={id} />
        <p className="post-timestamp">{timeSince(createdAt)}</p>
      </div>
    </div>
  );
}

function User({ user }) {
  const profileLink = "/" + user?.id;

  return (
    <div className="post-header">
      <Link to={profileLink}>
        <Avatar src={user?.image} />
      </Link>
      {user && (
        <>
          <Link to={profileLink}>
            <p className="post-fullname">{user.name}</p>
          </Link>
          <Link to={profileLink}>
            <p className="post-username">@{user.id}</p>
          </Link>
        </>
      )}
    </div>
  );
}

function Doit({ doit, id }) {
  const currentUser = useSessionUser();
  const currentUserId = currentUser?.id;
  const dispatch = useDispatch();

  const hasDoit = doit.includes(currentUserId);
  const style = hasDoit ? { color: "#75af24" } : undefined;

  const handleClick = async () => {
    if (!currentUser) return null;
    if (hasDoit) {
      await dispatch(removeDoit(id, currentUserId));
    } else {
      await dispatch(addDoit(id, currentUserId));
    }
  };

  return (
    <div className="post-doit" onClick={handleClick} style={style}>
      <span>doit</span>
      {doit.length}
    </div>
  );
}

function AccomplishedGoalMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.25em"
      viewBox="0 0 512 512"
    >
      <path
        className="theme-icon"
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
      />
    </svg>
  );
}

export default Post;
