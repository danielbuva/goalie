import { useState } from "react";
import Avatar from "../Avatar";
import "./index.css";
import Tabs, { TabIndicator, Tab } from "../Tabs";
import Posts, { Post } from "../Post";

export default function ProfilePage() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="profile-page">
      <div className="profile-page-banner"></div>
      <div className="profile-page-top-half">
        <div>
          <div className="profile-page-bio-button-holder">
            <div className="profile-page-bio-follows">
              <Avatar boxSize="136px" />
              <h2>dani</h2>
              <p>
                <span>@username </span>
              </p>

              <p className="profile-page-bio">welcome to my page</p>
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
        <Tabs>
          <Tab text="Goals" />
          <Tab text="Challenges" />
          <Tab text="Acomplished" />
        </Tabs>
      </div>
      <div className="profile-page-bottom-half">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
