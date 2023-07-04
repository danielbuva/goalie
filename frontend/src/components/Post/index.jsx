import { Link, useParams } from "react-router-dom";
import Avatar from "../Avatar";
import "./Post.css";
import Options from "./Options";
import { timeSince } from "../../utils";
import { useDispatch } from "react-redux";
import { addDoit } from "../../store/goals";

export function Post({ title, doit, createdAt, body, user, id, index }) {
  const { userId } = useParams();

  return (
    <div className="post">
      {!userId && <User user={user} />}

      <div>
        <p className="post-title">{title}</p>
        <Options post={{ title, body, id }} index={index} />
      </div>

      <p className="post-body">{body}</p>
      <div className="post-footer">
        <Doit doit={doit} id={id}/>
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

function Doit({ doit ,id }) {
  const dispatch = useDispatch();
  const handleClick = async () => {
  
    await dispatch(addDoit(id));
  };
  return (
    <div className="post-doit" onClick={handleClick}>
      <span>doit</span>
      {doit}
    </div>
  );
}

export default Post;
