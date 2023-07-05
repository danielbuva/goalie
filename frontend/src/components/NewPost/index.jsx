import { createGoal, updateGoal } from "../../store/goals";
import useSessionUser from "../../hooks/useSessionUser";
import { useModal } from "../../hooks/useModal";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Avatar from "../Avatar";

import "./NewPost.css";

function NewPost({ type = "goal", post, index }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const currentUser = useSessionUser();
  const { pathname } = useLocation();

  const shouldUpdateProfile = pathname.includes(currentUser?.id);

  const titleHasError = title.length > 50;
  const bodyHasError = body.length > 255;
  const noBody = body.length === 0;

  const handleClick = async () => {
    if (titleHasError || bodyHasError || noBody) {
      return setShow(true);
    }
    let res;
    if (post?.body) {
      res = await dispatch(
        updateGoal({ goal: { title, body }, id: post.id, index })
      );
    } else {
      res = await dispatch(
        createGoal({ title, body }, shouldUpdateProfile)
      );
    }
    if (res) {
      setErrors(res);
      console.log(errors);
    } else {
      closeModal();
    }
  };

  const bodyPlaceholder =
    type === "goal" ? "Write a goal..." : "Challenge the world...";

  const titleErrorStyle = titleHasError
    ? { color: "#f4212e" }
    : title.length >= 40
    ? { color: "inherit" }
    : { opacity: 0 };

  const bodyErrorStyle = bodyHasError
    ? { color: "#f4212e" }
    : body.length >= 230
    ? { color: "inherit" }
    : { opacity: 0 };

  return (
    <div id="new-post">
      <div id="new-post-header">
        <Avatar hover={false} />
        <div id="new-post-content">
          <div className="new-post-b">
            <input
              id="title-input"
              placeholder="Title"
              onChange={(e) => {
                setShow(false);
                setTitle(e.target.value);
              }}
              value={title}
            />
            <p style={titleErrorStyle}>{title.length}/50</p>
          </div>
          <div className="new-post-b">
            <textarea
              id="new-post-body"
              placeholder={bodyPlaceholder}
              onChange={(e) => {
                setShow(false);
                setBody(e.target.value);
              }}
              value={body}
            />
            <p style={bodyErrorStyle}>{body.length}/255</p>
          </div>
        </div>
      </div>

      <div id="divider" />
      <div id="new-post-footer">
        <div id="new-post-errors">
          <p style={{ opacity: show && noBody ? 1 : 0 }}>Enter a goal!</p>
          <p style={{ opacity: show && titleHasError ? 1 : 0 }}>
            Title too long!
          </p>
          <p style={{ opacity: show && bodyHasError ? 1 : 0 }}>
            Body too long!
          </p>
        </div>
        <button id="new-post-submit" onClick={handleClick}>
          Goal +
        </button>
      </div>
    </div>
  );
}

export default NewPost;
