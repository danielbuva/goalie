import useSessionUser from "../../../hooks/useSessionUser";
import { Menu, MenuItem, useMenu } from "../../Menu";
import { useModal } from "../../../hooks/useModal";
import { useParams } from "react-router-dom";
import Ellipsis from "../../icons/Ellipsis";
import DeleteGoal from "./DeleteGoal";
import NewPost from "../../NewPost";
import { useDispatch } from "react-redux";
import { updateCompleteStatus } from "../../../store/goals";

export default function Options({ post, index }) {
  const { buttonRef, menuRef, toggleMenu, hideMenu, show } = useMenu();
  const { showModal, setWidth } = useModal();
  const { userId } = useParams();

  const currentUser = useSessionUser();
  const isOwnProfile = currentUser?.id === userId;

  const dispatch = useDispatch();

  if (!isOwnProfile) return null;

  return (
    <div ref={buttonRef}>
      <div
        style={{ cursor: "pointer", position: "relative" }}
        onClick={toggleMenu}
      >
        <Ellipsis />
      </div>
      <Menu isOpen={show} menuRef={menuRef} right>
        <MenuItem
          onClick={() => {
            hideMenu();
            showModal(<NewPost post={post} index={index} />);
          }}
          text="Edit"
        />
        <MenuItem
          onClick={() => {
            setWidth("fit-content");
            hideMenu();
            showModal(<DeleteGoal id={post.id} />, "Delete Goal?");
          }}
          text="Delete"
        />
        <MenuItem
          onClick={() => {
            dispatch(updateCompleteStatus(post.id, !post.status));
          }}
          text={post.status ? "Mark as incomplete" : "Mark as complete"}
        />
      </Menu>
    </div>
  );
}
