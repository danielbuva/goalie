import { useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import "./Post.css";

export function Post() {
  const { pathname } = useLocation();
  const isOnProfile = pathname.slice(1) === "danibuva";

  const title = "github commit everyday";
  const doit = 100;
  const createdAt = "20 days ago";
  const body =
    "I am going to make a github commit every day. wish me luck! :)";

  return (
    <div className="post">
      <div className="post-header">
        {!isOnProfile && <Avatar />}
        <p className="post-title">{title}</p>
      </div>
      <p className="post-body">{body}</p>

      <div className="post-footer">
        <p className="post-doit">
          <span>doit</span>
          {doit}
        </p>
        <p className="post-timestamp">{createdAt}</p>
      </div>
    </div>
  );
}

export default Post;
