import { updateCompleteStatus } from "../../../store/goals";
import useSessionUser from "../../../hooks/useSessionUser";
import { Menu, MenuItem, useMenu } from "../../Menu";
import { useModal } from "../../../hooks/useModal";
import { useParams } from "react-router-dom";
import Ellipsis from "../../icons/Ellipsis";
import { useDispatch } from "react-redux";
import DeleteGoal from "./DeleteGoal";
import NewPost from "../../NewPost";

export default function Options({ post, index }) {
  const { buttonRef, menuRef, toggleMenu, hideMenu, show } = useMenu();
  const { showModal, setWidth } = useModal();
  const { userId } = useParams();

  const currentUser = useSessionUser();
  const isOwnProfile = currentUser?.id === userId;

  const dispatch = useDispatch();

  if (!isOwnProfile || !currentUser) return null;

  return (
    <div ref={buttonRef}>
      <Ellipsis onClick={toggleMenu} />
      <Menu isOpen={show} menuRef={menuRef} right>
        {!post.status && (
          <MenuItem
            onClick={() => {
              hideMenu();
              showModal(<NewPost post={post} index={index} />);
            }}
            text="Edit"
          />
        )}
        <MenuItem
          onClick={() => {
            hideMenu();
            setWidth("fit-content");
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
