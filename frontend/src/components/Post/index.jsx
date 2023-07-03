import { Link, useParams } from "react-router-dom";
import Avatar from "../Avatar";
import "./Post.css";

export function Post({ title, doit, createdAt, body, user }) {
  const { userId } = useParams();

  const profileLink = "/" + user?.id;

  return (
    <div className="post">
      <div className="post-header">
        {!userId && (
          <div className="post-user">
            <Link to={profileLink}>
              <Avatar />
            </Link>
            <Link to={profileLink}>
              <p className="post-fullname">{user.name}</p>
            </Link>
            <Link to={profileLink}>
              <p className="post-username">@{user.id}</p>
            </Link>
          </div>
        )}
      </div>
      <p className="post-title">{title}</p>
      <p className="post-body">{body}</p>

      <div className="post-footer">
        <p className="post-doit">
          <span>doit </span>
          {doit}
        </p>
        <p className="post-timestamp">{createdAt}</p>
      </div>
    </div>
  );
}

export default Post;
