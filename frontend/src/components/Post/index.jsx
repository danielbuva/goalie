import { Link, useParams } from "react-router-dom";
import Avatar from "../Avatar";
import "./Post.css";
import Options from "./Options";
import { timeSince } from "../../utils";
import { useDispatch } from "react-redux";
import { addDoit, removeDoit } from "../../store/goals";
import useSessionUser from "../../hooks/useSessionUser";

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

      <p className="post-body">{body}</p>
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
        <Avatar />
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

export default Post;
