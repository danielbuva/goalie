import { useSelector, useDispatch } from "react-redux";
import { getAllChallenges } from "../../store/challenges";
import { useEffect, useState } from "react";
import "./Challenges.css";

import Avatar from "../Avatar";
import { CreateSingleChallenge } from "../../store/challenges";
import SingleChallenge from "./SingleChallenge";

export default function Challenges() {
  const dispatch = useDispatch();
  let allChallenges = useSelector((state) => state.challenges.challenges);
  const user = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let newErrors = {};
    if (!title.length) newErrors.title = "title required";
    if (!body.length) newErrors.body = "body required";

    setErrors(newErrors);
  }, [dispatch, title, body]);

  const challengeClicker = () => {
    if (Object.keys(errors).length) return;
    let obj = {
      title,
      body,
      image: "exercise",
    };
    dispatch(CreateSingleChallenge(obj));
    setTitle("");
    setBody("");
  };

  const titleChanger = (e) => {
    setTitle(e.target.value);
  };

  const bodyChanger = (e) => {
    setBody(e.target.value);
  };

  console.log("ALL_CHALLENGES: ", allChallenges);

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch]);

  if (!allChallenges || allChallenges.length < 1) return null;

  allChallenges = allChallenges.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="challengesWrapper">
      {user && (
        <div className="challengesPostForm">
          <div className="challengesPostBox">
            <div className="callenges-avatar-wrapper">
              <Avatar />
            </div>
            <div className="challengesPostInputs">
              <input
                className="challengePostTitle"
                placeholder="Title"
                value={title}
                onChange={titleChanger}
              />
              <input
                className="challengePostBody"
                placeholder="Challenge the World..."
                value={body}
                onChange={bodyChanger}
              />
            </div>
          </div>
          <div className="singleChallenge-button-wrapper">
            <button onClick={challengeClicker}>Challenge +</button>
          </div>
        </div>
      )}
      {allChallenges.map((challenge) => (
        <SingleChallenge key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
