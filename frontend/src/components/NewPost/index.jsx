import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import "./NewPost.css";
import { useState } from "react";
import { createGoal } from "../../store/goals";
import { useModal } from "../../hooks/useModal";

function NewPost({ type = "goal" }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleClick = async () => {
    const res = await dispatch(createGoal({ title, body }));
    if (res) {
      setErrors(res);
      console.log(errors);
    } else {
      closeModal();
    }
  };

  const bodyPlaceholder =
    type === "goal" ? "Write a goal..." : "Challenge the world...";
  return (
    <div id="new-post">
      <div id="new-post-header">
        <Avatar hover={false} />
        <div id="new-post-content">
          <input
            id="new-post-title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            id="new-post-body"
            placeholder={bodyPlaceholder}
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>
      </div>

      <div id="divider" />

      <div id="new-post-footer">
        <button id="new-post-submit" onClick={handleClick}>
          Goal +
        </button>
      </div>
    </div>
  );
}

export default NewPost;
