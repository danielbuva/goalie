import useSessionUser from "../../../hooks/useSessionUser";
import { Menu, MenuItem, useMenu } from "../../Menu";
import { useModal } from "../../../hooks/useModal";
import { useParams } from "react-router-dom";
import Ellipsis from "../../icons/Ellipsis";
import DeleteGoal from "./DeleteGoal";
import NewPost from "../../NewPost";

export default function Options({ post, index }) {
  const { buttonRef, menuRef, toggleMenu, hideMenu, show } = useMenu();
  const { showModal } = useModal();
  const { userId } = useParams();

  const currentUser = useSessionUser();
  const isOwnProfile = currentUser?.id === userId;

  if (!isOwnProfile) return null;

  return (
    <div
      style={{ cursor: "pointer" }}
      ref={buttonRef}
      onClick={toggleMenu}
    >
      <Ellipsis />
      <Menu isOpen={show} menuRef={menuRef}>
        <MenuItem
          onClick={() => {
            hideMenu();
            showModal(<NewPost post={post} index={index} />);
          }}
          text="Edit"
        />
        <MenuItem
          onClick={() => {
            hideMenu();
            showModal(<DeleteGoal id={post.id} />);
          }}
          text="Delete"
        />
      </Menu>
    </div>
  );
}
