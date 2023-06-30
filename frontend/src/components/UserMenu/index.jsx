import Avatar from "../Avatar";
import Ellipsis from "../icons/Ellipsis";
import "./Usermenu.css";

function UserMenu() {
  const { showModal } = useModalContext();
  const handleClick = () => {
    if (onOpen) {
      onOpen();
    }
    showModal(body, header);
  };
  return (
    <div className="usermenu">
      <Avatar />
      <Ellipsis />
    </div>
  );
}

export default UserMenu;
