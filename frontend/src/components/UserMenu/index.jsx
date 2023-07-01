import { useModal } from "../../hooks/useModal";
import Avatar from "../Avatar";
import LoginForm from "../LoginForm";
import { Menu, MenuItem, useMenu } from "../NavButtons";
import SignupForm from "../SignupForm";
import Ellipsis from "../icons/Ellipsis";
import "./Usermenu.css";

function UserMenu() {
  const { buttonRef, menuRef, toggleMenu, show, hideMenu } = useMenu();
  const { showModal } = useModal();
  return (
    <div className="usermenu" onClick={toggleMenu} ref={buttonRef}>
      <Avatar />
      <Ellipsis />
      <Menu isOpen={show} menuRef={menuRef}>
        <MenuItem
          // icon={<Display />}
          text="Login"
          onClick={() => {
            hideMenu();
            showModal(<LoginForm />);
          }}
        />
        <MenuItem
          // icon={<Display />}
          text="Sign up"
          onClick={() => {
            hideMenu();
            showModal(<SignupForm />);
          }}
        />
      </Menu>
    </div>
  );
}

export default UserMenu;
