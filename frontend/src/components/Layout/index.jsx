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
          <div id="content-right">
            <UserMenu />
            <YourGoals />
            <Credits />
          </div>
        </div>
      </div>
    </div>
  );
}

function Credits() {
  return (
    <div id="credits">
      <p>dev team:</p>
      <a
        href="https://github.com/melodyyoo"
        target="_blank"
        rel="noopener noreferrer"
      >
        Melody Yoo
      </a>
      <a
        href="https://github.com/huanglallen"
        target="_blank"
        rel="noopener noreferrer"
      >
        Allen Huang
      </a>
      <a
        href="https://github.com/ihavenoide"
        target="_blank"
        rel="noopener noreferrer"
      >
        James Hernandez
      </a>
      <a
        href="https://github.com/danielbuva"
        target="_blank"
        rel="noopener noreferrer"
      >
        Daniel Valdecantos
      </a>
    </div>
  );
}

export default Layout;
