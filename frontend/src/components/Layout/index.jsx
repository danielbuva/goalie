import useIsLoaded from "../../hooks/useIsLoaded";
import YourGoals from "../Goals/YourGoals";
import { Outlet } from "react-router-dom";
import GoalieLogo from "../GoalieLogo";
import NavButtons from "./NavButtons";
import UserMenu from "./UserMenu";
import Title from "./Title";

import "./Layout.css";

function Layout() {
  const isLoaded = useIsLoaded();

  return (
    <div id="layout">
      <div id="left">
        <div id="content-left-container">
          <div id="content-left">
            <div id="logo-div">
              <GoalieLogo />
            </div>
            <NavButtons />
          </div>
        </div>
      </div>
      <div id="main">
        <Title />
        {isLoaded && <Outlet />}
      </div>
      <div id="right">
        <div id="content-right-container">
          <div id="right-cut-off">
            <UserMenu />
          </div>
          <div id="content-right">
            <YourGoals />
          </div>
          <Credits />
        </div>
      </div>
    </div>
  );
}

function Credits() {
  return (
    <div id="credits">
      <p>dev team:</p>
      <div className="credits-a-wrappers">
        Melody Yoo
        <a
          href="https://github.com/melodyyoo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="www.linkedin.com/in/melody-yoo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="credits-a-wrappers">
        Allen Huang
        <a
          href="https://github.com/huanglallen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/huanglallen/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="credits-a-wrappers">
        James Hernandez
        <a
          href="https://github.com/ihavenoide"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/james-hernandez-76191623a/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <div className="credits-a-wrappers">
        Daniel Valdecantos
        <a
          href="https://github.com/danielbuva"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-valdecantos-14792a210/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export default Layout;
