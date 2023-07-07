import useSessionUser from "../../hooks/useSessionUser";
import { useEffect, useRef, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { createGoal } from "../../store/goals";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Avatar from "../Avatar";

import "./HomePost.css";

function HomePost() {
  const [showTitle, setShowTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const textAreaRef = useRef(null);
  const adjustTextareaHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = "23px";
    const textAreaHeight = textarea.scrollHeight + "px";
    textarea.style.height = textAreaHeight;
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [body]);

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
    const res = await dispatch(
      createGoal({ title, body }, shouldUpdateProfile)
    );
    setBody("");
    setTitle("");
    setErrors({});
    setShowTitle(false);

    if (res) {
      setErrors(res);
    } else {
      closeModal();
    }
  };

  const bodyPlaceholder = "Write a goal...";

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
    <div id="home-container">
      <div id="home-post">
        <Avatar src={currentUser.image} hover={false} />
        <div id="home-post-main">
          <div id="home-post-content">
            <div
              className="home-post-a"
              style={{
                height: !showTitle && 0,
                opacity: !showTitle && 0,
                marginTop: !showTitle && "-15px",
              }}
            >
              <input
                id="home-title-input"
                placeholder="Title"
                onChange={(e) => {
                  setShow(false);
                  setTitle(e.target.value);
                }}
                value={title}
              />
              <p style={titleErrorStyle}>{title.length}/50</p>
            </div>
            <div className="home-post-b">
              <textarea
                id="home-post-text"
                ref={textAreaRef}
                placeholder={bodyPlaceholder}
                onChange={(e) => {
                  setShow(false);
                  setBody(e.target.value);
                }}
                onClick={() => setShowTitle(true)}
                value={body}
              />
              <p style={bodyErrorStyle}>{body.length}/255</p>
            </div>
          </div>
          <div>
            <div id="divider" />
            <div id="home-post-footer">
              <div id="home-post-errors" style={{ opacity: !show && 0 }}>
                {noBody && <p>Enter a goal!</p>}
                {titleHasError && <p>Title too long!</p>}
                {bodyHasError && <p>Body too long!</p>}
              </div>
              <SubmitButton onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ onClick, type }) {
  const text = type === "challenge" ? "Challenge +" : "Goal +";
  return (
    <button id="home-submit" onClick={onClick} disabled>
      {text}
    </button>
  );
}

export default HomePost;
