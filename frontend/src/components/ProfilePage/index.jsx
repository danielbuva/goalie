// import { useState } from "react";
import Avatar from "../Avatar";
import "./index.css";
// import Tabs, { TabIndicator, Tab } from "../Tabs";
// import Posts, { Post } from "../Post";
import UserGoals from "../Goals/UserGoals";
import useSessionUser from "../../hooks/useSessionUser";

export default function ProfilePage() {
  // const [tabIndex, setTabIndex] = useState(0);
  const currentUser = useSessionUser();

  if (!currentUser) return null;

  return (
    <div className="profile-page">
      <div className="profile-page-banner"></div>
      <div className="profile-page-top-half">
        <div>
          <div className="profile-page-bio-button-holder">
            <div className="profile-page-bio-follows">
              <Avatar boxSize="136px" />
              <h2>{currentUser.firstName}</h2>
              <p>
                <span>@{currentUser.username}</span>
              </p>

              <p className="profile-page-bio">{currentUser.bio}</p>
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
