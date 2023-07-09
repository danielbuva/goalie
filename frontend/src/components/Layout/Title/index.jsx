import { useLocation, useNavigate } from "react-router-dom";
import { useColorMode } from "../../../hooks/useTheme";
import { useSelector } from "react-redux";
import Arrow from "../../icons/Arrow";

function Title() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.users.user);
  const hasHistory = sessionStorage.getItem("hasVisited");
  const navigate = useNavigate();

  const textColor = useColorMode("#536471", "#8b98a5", "#71767b");

  const handleGoBack = () => {
    window.getSelection().empty();
    if (!hasHistory) {
      sessionStorage.setItem("hasVisited", "true");
      navigate("/home");
    } else {
      navigate(-1);
    }
  };

  const onFollowerPage = pathname.includes("follower") && user;
  const onFollowingPage = pathname.includes("following") && user;

  let title = "";
  if (pathname.includes(user?.id)) {
    title = user.name;
  } else if (pathname.includes("/home")) {
    title = "Home";
  } else if (pathname.includes("/challenges")) {
    title = "Challenges";
  } else if (pathname.includes("/communities")) {
    title = "Communities";
  }

  const followerStyle = onFollowerPage ? undefined : { color: textColor };

  const followingStyle = onFollowingPage
    ? undefined
    : { color: textColor };

  return (
    <div id="title" onClick={() => window.scrollTo(0, 0)}>
      {/* {title !== "Home" && (
        <button onClick={handleGoBack} id="back-button">
          <Arrow />
        </button>
      )} */}
      {onFollowerPage || onFollowingPage ? (
        <div id="title-follow-page">
          <div id="title-header-container">
            <button onClick={handleGoBack} id="back-button">
              <Arrow />
            </button>
            <div>
              <h2 id="title-header">{title}</h2>
              <p id="title-username">@{user.id}</p>
            </div>
          </div>
          <div className="title-follow">
            <div
              className="follow-tab"
              onClick={() => navigate(`/${user.id}/followers`)}
              style={followerStyle}
            >
              Followers
            </div>
            <div
              className="follow-tab"
              onClick={() => navigate(`/${user.id}/following`)}
              style={followingStyle}
            >
              Following
            </div>
            <div
              className="title-tab-indicator"
              style={{ left: onFollowerPage ? "116px" : "417px" }}
            ></div>
          </div>
        </div>
      ) : (
        <h2>{title}</h2>
      )}
    </div>
  );
}

export default Title;
