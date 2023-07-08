import {
  Link,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import useSessionUser from "../../hooks/useSessionUser";
import { useSelector, useDispatch } from "react-redux";
import { CreateFollower } from "../../store/session";
import { useColorMode } from "../../hooks/useTheme";
import { authenticate } from "../../store/session";
import { useModal } from "../../hooks/useModal";
import { Unfollow } from "../../store/session";
import { getUser } from "../../store/users";
import { Outlet } from "react-router-dom";
import EditProfile from "../EditProfile";
import { useEffect } from "react";
import Avatar from "../Avatar";

import "./index.css";

function getMonthYear(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const currentUser = useSessionUser();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { showModal } = useModal();

  const col = useColorMode("#fff", "#15202B", "#000");

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId, currentUser]);

  const tabColor = useColorMode("#0f1419", "#f7f9f9");

  if (!user) return null;

  const challengesTab = pathname.includes("challenges");
  const accomplishedTab = pathname.includes("accomplished");
  const communitiesTab = pathname.includes("communities");
  const goalsTab = pathname === "/" + user.id;

  const tabPosition = challengesTab
    ? 158
    : accomplishedTab
    ? 312
    : communitiesTab
    ? 474
    : 35;

  const followerClicker = () => {
    navigate(`followers?type=followers`);
  };

  const followingClicker = () => {
    navigate(`followers?type=followings`);
  };

  const isFollowing = user.followers?.find(
    (follower) => follower.id === currentUser?.id
  );
  let followClicker = () => {
    if (isFollowing) dispatch(Unfollow(user.id));
    if (!isFollowing) dispatch(CreateFollower(user.id));
    dispatch(authenticate());
  };

  const isOwnProfile = currentUser?.id === user.id;
  return (
    <div className="profile">
      <div className="profile-banner">
        {user.banner && (
          <img
            alt="banner"
            style={{ height: "200px", width: "600px", objectFit: "cover" }}
            src={user.banner}
          />
        )}
      </div>
      <div className="profile-header">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="profile-bio-button-holder">
            <div className="profile-bio-follows">
              <Avatar
                boxSize="136px"
                border={`solid 4px ${col}`}
                borderRadius="100%"
                src={user.image}
              />
              <h2 style={{ paddingTop: "16px" }}>{user.name}</h2>
              <p id="profile-username">@{user.id}</p>
              <p className="profile-bio">{user.bio}</p>
              <p id="joined-at">
                <Calendar /> Joined {getMonthYear(user.createdAt)}
              </p>
              <div className="profile-followings-holder">
                <p>
                  {user.following?.length || 0}
                  <span onClick={followingClicker}> Following </span>
                </p>
                <p>
                  {user.followers?.length || 0}
                  <span onClick={followerClicker}> Followers </span>
                </p>
              </div>
            </div>
            {!isOwnProfile && currentUser && (
              <button onClick={followClicker}>
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
          </div>
          {isOwnProfile && (
            <button
              className="edit-profile-button"
              onClick={() => showModal(<EditProfile />, "Edit profile")}
            >
              Edit profile
            </button>
          )}
        </div>
      </div>
      <div className="profile-tabs">
        <Link
          to={`/${userId}`}
          style={{ color: goalsTab ? tabColor : "#8b98a5" }}
        >
          Goals
        </Link>
        <Link
          to={`/${userId}/challenges`}
          style={{ color: challengesTab ? tabColor : "#8b98a5" }}
        >
          Challenges
        </Link>
        <Link
          to={`/${userId}/accomplished`}
          style={{ color: accomplishedTab ? tabColor : "#8b98a5" }}
        >
          Accomplished
        </Link>
        <Link
          to={`/${userId}/communities`}
          style={{ color: communitiesTab ? tabColor : "#8b98a5" }}
        >
          Communities
        </Link>
        <div className="profile-indicator" style={{ left: tabPosition }} />
      </div>
      <div className="profile-bottom-half">
        <Outlet />
      </div>
    </div>
  );
}

function Calendar() {
  return (
    <svg
      width="18.75px"
      height="18.75px"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="#8b98a5"
    >
      <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
    </svg>
  );
}
