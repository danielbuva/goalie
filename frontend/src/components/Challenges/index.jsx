import { CreateSingleChallenge } from "../../store/challenges";
import { getAllChallenges } from "../../store/challenges";
import useSessionUser from "../../hooks/useSessionUser";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import SingleChallenge from "./SingleChallenge";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

import "./Challenges.css";
import "../HomePost/HomePost.css";

export default function Challenges() {
  const [showTitle, setShowTitle] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  let allChallenges = useSelector((state) => state.challenges.challenges);
  const currentUser = useSessionUser();

  const textAreaRef = useRef(null);
  const adjustTextareaHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = "23px";
      const textAreaHeight = textarea.scrollHeight + "px";
      textarea.style.height = textAreaHeight;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [body]);

  const titleHasError = title.length > 50;
  const noTitle = title.length === 0;
  const bodyHasError = body.length > 500;
  const noBody = body.length === 0;

  const handleClick = () => {
    console.log("entering");
    if (titleHasError || noTitle || bodyHasError || noBody) {
      return setShow(true);
    }
    let obj = {
      title,
      body,
      image: "exercise",
    };
    dispatch(CreateSingleChallenge(obj));
    setTitle("");
    setBody("");
    setShowTitle(false);
  };

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch]);

  if (!allChallenges || allChallenges.length < 1) return null;

  allChallenges = allChallenges.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const titleErrorStyle = titleHasError
    ? { color: "#f4212e" }
    : title.length >= 40
    ? { color: "inherit" }
    : { opacity: 0 };

  const bodyErrorStyle = bodyHasError
    ? { color: "#f4212e" }
    : body.length >= 480
    ? { color: "inherit" }
    : { opacity: 0 };

  return (
    <div>
      {currentUser && (
        <div id="home-container" onClick={() => setShowTitle(true)}>
          <div id="home-post">
            <Link to={`/${currentUser.id}`}>
              <Avatar src={currentUser.image} />
            </Link>
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
                    className="home-title-input"
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
                    className="home-post-text"
                    ref={textAreaRef}
                    placeholder="Challenge the world!"
                    onChange={(e) => {
                      setShow(false);
                      setBody(e.target.value);
                    }}
                    onClick={() => setShowTitle(true)}
                    value={body}
                  />
                  <p style={bodyErrorStyle}>{body.length}/500</p>
                </div>
              </div>
              <div>
                <div id="divider" />
                <div id="home-post-footer">
                  <div
                    id="home-post-errors"
                    style={{ opacity: !show && 0 }}
                  >
                    {titleHasError && <p>Title too long!</p>}
                    {noTitle && <p>Enter a title!</p>}
                    {bodyHasError && <p>Body too long!</p>}
                    {noBody && <p>Enter a goal!</p>}
                  </div>
                  <SubmitButton onClick={handleClick} disabled={noBody} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {allChallenges.map((challenge) => (
        <SingleChallenge key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}

function SubmitButton({ disabled, onClick }) {
  return (
    <div className="submit-overlay" style={{ opacity: disabled && 0.5 }}>
      <button id="home-submit" onClick={onClick} disabled={disabled}>
        Challenge +
      </button>
    </div>
  );
}
