import { Menu, MenuItem, useMenu } from "../Menu";
import { useModal } from "../../hooks/useModal";
import Ellipsis from "../icons/Ellipsis";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import Avatar from "../Avatar";
import "./Usermenu.css";

function UserMenu() {
  const { buttonRef, menuRef, toggleMenu, show, hideMenu } = useMenu();
  const { showModal } = useModal();
  return (
    <>
      <div className="usermenu" onClick={toggleMenu} ref={buttonRef}>
        <Avatar />
        <Ellipsis />
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
