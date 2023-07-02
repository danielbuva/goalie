import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../store/users";
import UserGoals from "../Goals/UserGoals";
import { useEffect } from "react";
import Avatar from "../Avatar";

import "./index.css";

export default function ProfilePage() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  console.log(user);

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-page-banner"></div>
      <div className="profile-page-top-half">
        <div>
          <div className="profile-page-bio-button-holder">
            <div className="profile-page-bio-follows">
              <Avatar boxSize="136px" />
              <h2>{user.firstName}</h2>
              <p>
                <span>@{user.username}</span>
              </p>

              <p className="profile-page-bio">{user.bio}</p>
              <div className="profile-page-followings-holder">
                <p>
                  0<span> Following </span>
                </p>
                <p>
                  0<span> Followers </span>
                </p>
              </div>
            </div>
            <div>
              <button>Follow</button>
            </div>
          </div>
        </div>
        {/* <Tabs>
          <Tab text="Goals" />
          <Tab text="Challenges" />
          <Tab text="Acomplished" />
        </Tabs> */}
      </div>
      <div className="profile-page-bottom-half">
        <UserGoals />
      </div>
    </div>
  );
}
