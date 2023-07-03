import { useModal } from "../../hooks/useModal";
import { Menu, MenuItem, useMenu } from "../Menu";
import NewPost from "../NewPost";
import Ellipsis from "../icons/Ellipsis";

export default function Options({post, index}) {
  const { buttonRef, menuRef, toggleMenu, hideMenu, show } = useMenu();
  const { showModal } = useModal();

  return (
    <div style={{ cursor: "pointer" }} ref={buttonRef} onClick={toggleMenu}>
      <Ellipsis />
      <Menu isOpen={show} menuRef={menuRef}>
        <MenuItem
          onClick={() => {
            hideMenu();
            showModal(<NewPost post={post} index={index}/>);
          }}
          text="Edit"
        />
        <MenuItem
          onClick={() => {
            hideMenu();
            showModal(<NewPost/>);
          }}
          text="Delete"
        />
      </Menu>
    </div>
  );
}
