import useSessionUser from "../../../hooks/useSessionUser";
import { Menu, MenuItem, useMenu } from "../../Menu";
import { useModal } from "../../../hooks/useModal";
import { useTheme } from "../../../hooks/useTheme";
import { logout } from "../../../store/session";
import { useNavigate } from "react-router-dom";
import Ellipsis from "../../icons/Ellipsis";
import { useDispatch } from "react-redux";
import SignupForm from "../../SignupForm";
import LoginForm from "../../LoginForm";
import Avatar from "../../Avatar";
import "./Usermenu.css";

function UserMenu() {
  const { buttonRef, menuRef, toggleMenu, show, hideMenu } = useMenu();
  const { toggleMode } = useTheme();
  const { showModal } = useModal();
  const currentUser = useSessionUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div
        className="user-menu"
        onClick={toggleMenu}
        ref={buttonRef}
        style={{ width: currentUser ? "250px" : "45px" }}
      >
        <div className="user">
          <Avatar src={currentUser?.image}/>
          {currentUser && (
            <div className="user-info">
              <p className="user-menu-name">{currentUser.name}</p>
              <p className="user-menu-username">@{currentUser.id}</p>
            </div>
          )}
        </div>
        {currentUser && <Ellipsis />}
      </div>

      <Menu isOpen={show} menuRef={menuRef} top="80px">
        {currentUser ? (
          <>
            <MenuItem
              text="Profile"
              onClick={() => {
                hideMenu();
                navigate(`/${currentUser.id}`);
              }}
            />
            <MenuItem text="Toggle Theme" onClick={toggleMode} />
            <MenuItem
              text="Log out"
              onClick={() => {
                hideMenu();
                dispatch(logout());
              }}
            />
          </>
        ) : (
          <>
            <MenuItem text="Toggle Theme" onClick={toggleMode} />
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
