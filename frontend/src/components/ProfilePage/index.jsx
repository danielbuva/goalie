import useSessionUser from "../../hooks/useSessionUser";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/users";
import UserGoals from "../Goals/UserGoals";
import { useEffect } from "react";
import Avatar from "../Avatar";

import "./index.css";

export default function ProfilePage() {
  const user = useSelector((state) => state.users.user);
  const currentUser = useSessionUser();
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (!user) return null;

  const isOwnProfile = currentUser.username === user.username;

  return (
    <div className="profile">
      <div className="profile-banner"></div>
      <div className="profile-header">
        <div>
          <div className="profile-bio-button-holder">
            <div className="profile-bio-follows">
              <Avatar boxSize="136px" />
              <h2 style={{ paddingTop: "16px" }}>{user.firstName}</h2>
              <p>
                <span>@{user.username}</span>
              </p>

              <p className="profile-bio">{user.bio}</p>
              <div className="profile-followings-holder">
                <p>
                  0<span> Following </span>
                </p>
                <p>
                  0<span> Followers </span>
                </p>
              </div>
            </div>
            {!isOwnProfile && <button>Follow</button>}
          </div>
        </div>
      </div>
      <div className="profile-bottom-half">
        <UserGoals />
      </div>
    </div>
  );
}
