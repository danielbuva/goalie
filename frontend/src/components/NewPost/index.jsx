// import useSessionUser from "../../hooks/useSessionUser";
import Avatar from "../Avatar";
import "./NewPost.css";

function NewPost({ type = "goal" }) {
  // const currentUser = useSessionUser(); add curr user image to avatar src
  const bodyPlaceholder =
    type === "goal" ? "Write a goal..." : "Challenge the world...";
  return (
    <div id="new-post">
      <div id="new-post-header">
        <Avatar hover={false} />
        <div id="new-post-content">
          <input id="new-post-title" placeholder="Title" />
          <textarea id="new-post-body" placeholder={bodyPlaceholder} />
        </div>
      </div>

      <div id="divider" />

      <div id="new-post-footer">
        <button id="new-post-submit">Goal +</button>
      </div>
    </div>
  );
}

export default NewPost;
