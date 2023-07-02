import useSessionUser from "../../../hooks/useSessionUser";
import { Menu, MenuItem, useMenu } from "../../Menu";
import { useModal } from "../../../hooks/useModal";
import { logout } from "../../../store/session";
import Ellipsis from "../../icons/Ellipsis";
import { useDispatch } from "react-redux";
import SignupForm from "../../SignupForm";
import LoginForm from "../../LoginForm";
import Avatar from "../../Avatar";
import "./Usermenu.css";

function UserMenu() {
  const { buttonRef, menuRef, toggleMenu, show, hideMenu } = useMenu();
  const { showModal } = useModal();
  const currentUser = useSessionUser();
  const dispatch = useDispatch();

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
              <p className="user-menu-name">{currentUser.name}</p>
              <p className="user-menu-username">@{currentUser.username}</p>
            </div>
          )}
        </div>
        {currentUser && <Ellipsis />}
      </div>

      <Menu isOpen={show} menuRef={menuRef}>
        {currentUser ? (
          <MenuItem
            text="Log out"
            onClick={() => {
              hideMenu();
              dispatch(logout());
            }}
          />
        ) : (
          <>
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
          </>
        )}
      </Menu>
    </>
  );
}

export default UserMenu;
