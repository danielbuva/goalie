import { Menu, MenuItem, useMenu } from "../Menu";
import { useModal } from "../../hooks/useModal";
import Ellipsis from "../icons/Ellipsis";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import Avatar from "../Avatar";
import "./Usermenu.css";
import useSessionUser from "../../hooks/useSessionUser";

function UserMenu() {
  const { buttonRef, menuRef, toggleMenu, show, hideMenu } = useMenu();
  const { showModal } = useModal();
  const currentUser = useSessionUser();

  return (
    <>
      <div
        className="user-menu"
        onClick={toggleMenu}
        ref={buttonRef}
        style={{ width: currentUser ? "250px" : "45px" }}
      >
        <div className="user">
          <Avatar />
          {currentUser && (
            <div className="user-info">
              <p className="user-menu-name">daniel valdecantos</p>
              <p className="user-menu-username">@danibuva</p>
            </div>
          )}
        </div>
        {currentUser && <Ellipsis />}
      </div>
      <Menu isOpen={show} menuRef={menuRef}>
        <MenuItem
          text="Login"
          onClick={() => {
            hideMenu();
            showModal(<LoginForm />);
          }}
        />
        <MenuItem
          text="Sign up"
          onClick={() => {
            hideMenu();
            showModal(<SignupForm />);
          }}
        />
      </Menu>
    </>
  );
}

export default UserMenu;
