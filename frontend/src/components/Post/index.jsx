import { Link, useParams } from "react-router-dom";
import Avatar from "../Avatar";
import "./Post.css";
import useSessionUser from '../../hooks/useSessionUser'
import Options from "./Options";


export function Post({ title, doit, createdAt, body, user, id , index}) {
  const { userId } = useParams();

  const currentUser = useSessionUser()
  const profileLink = "/" + user?.id;
  const isOwnProfile = currentUser?.id === userId

  return (
    <div className="post">
      <div className="post-header">
        {!userId && (
          <div className="post-user">
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
        )}
      </div>
      <div>
        <p className="post-title">{title}</p>
       {isOwnProfile && <Options post={{title, body, id}} index={index}/>}
      </div>
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
