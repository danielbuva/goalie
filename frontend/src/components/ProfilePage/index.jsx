import {
  Link,
  useLocation,
  // useNavigate,
  useParams,
} from "react-router-dom";
import useSessionUser from "../../hooks/useSessionUser";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/users";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Avatar from "../Avatar";
import "./index.css";

export default function ProfilePage() {
  const user = useSelector((state) => state.users.user);
  const currentUser = useSessionUser();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { pathname } = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  // useEffect(() => {
  //   if (!user) return navigate("/not-found");
  // }, [user, navigate]);

  if (!user) return null;

  const tabPosition = pathname.includes("challenges")
    ? 158
    : pathname.includes("accomplished")
    ? 312
    : pathname.includes("communities")
    ? 474
    : 35;

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="profile">
      <div className="profile-banner"></div>
      <div className="profile-header">
        <div>
          <div className="profile-bio-button-holder">
            <div className="profile-bio-follows">
              <Avatar boxSize="136px" />
              <h2 style={{ paddingTop: "16px" }}>{user.name}</h2>
              <p>
                <span>@{user.id}</span>
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
      <div className="profile-tabs">
        <Link to={`/${userId}`}>Goals</Link>
        <Link to={`/${userId}/challenges`}>Challenges</Link>
        <Link to={`/${userId}/accomplished`}>Accomplished</Link>
        <Link to={`/${userId}/communities`}>Communities</Link>
        <div className="profile-indicator" style={{ left: tabPosition }} />
      </div>
      <div className="profile-bottom-half">
        <Outlet />
      </div>
    </div>
  );
}
