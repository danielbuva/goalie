import Avatar from "../Avatar";
import { useDispatch } from "react-redux";
import "./NewPost.css";
import { useState } from "react";
import { createGoal, updateGoal } from "../../store/goals";
import { useModal } from "../../hooks/useModal";

function NewPost({ type = "goal", post , index }) {
  const [title, setTitle] = useState(post.title ?? "");
  const [body, setBody] = useState(post.body ?? "");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleClick = async () => {
    let res;
    if (post.body) {
      res = await dispatch(updateGoal({goal: {title, body}, id: post.id, index}))
    } else {
      res = await dispatch(createGoal({ title, body }));
    }
    if (res) {
      setErrors(res);
      console.log(errors);
    } else {
      closeModal();
    }
  };

  const bodyPlaceholder = type === "goal" ? "Write a goal..." : "Challenge the world...";
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
