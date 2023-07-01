import { NavLink } from "react-router-dom";
import Communities from "./icons/Communities.jsx";
import Profile from "./icons/Profile.jsx";
import More from "./icons/More.jsx";
import Display from "./icons/Display.jsx";
import Challenges from "./icons/Challenges.jsx";
import Home from "./icons/Home.jsx";

import { useModal } from "../../hooks/useModal.js";
import DisplaySettings from "../DisplaySettings";

import "./NavButtons.css";
import useSessionUser from "../../hooks/useSessionUser.js";
import { Menu, MenuItem, useMenu } from "../Menu/index.jsx";

const NavButtons = () => {
  const currentUser = useSessionUser();

  return (
    <>
      <NavButton icon={<Home />} text="Home" to="/home" />
      <NavButton
        icon={<Challenges />}
        text="Challenges"
        to="/challenges"
      />
      <NavButton
        icon={<Communities />}
        text="Communities"
        to="/communities"
      />
      {currentUser && (
        <NavButton
          icon={<Profile />}
          text="Profile"
          to={`/${currentUser.username}`}
        />
      )}
      <NavOption />
    </>
  );
};

function NavButton({ icon, text, to }) {
  return (
    <NavLink to={to}>
      <div className="nav-link-container">
        <div className="nav-link-content">
          {icon}
          <p className="nav-text">{text}</p>
        </div>
      </div>
    </NavLink>
  );
}

function NavOption() {
  const { buttonRef, menuRef, toggleMenu, hideMenu, show } = useMenu();
  const { showModal } = useModal();

  return (
    <>
      <div
        className="nav-link-container"
        ref={buttonRef}
        onClick={toggleMenu}
      >
        <div className="nav-link-content">
          <div style={{ paddingTop: "10px" }}>
            <More isActive={show} />
          </div>
          <p className="nav-text">More</p>
        </div>
      </div>
      <Menu isOpen={show} menuRef={menuRef}>
        <MenuItem
          icon={<Display />}
          text="Display"
          onClick={() => {
            hideMenu();
            showModal(<DisplaySettings />);
          }}
        />
      </Menu>
    </>
  );
}

export default NavButtons;
