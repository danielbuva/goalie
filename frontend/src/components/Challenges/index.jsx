import { useSelector, useDispatch } from "react-redux";
import { getAllChallenges } from "../../store/challenges";
import { useEffect } from "react";
import "./Challenges.css"

import Avatar from "../Avatar"
import SingleChallenge from "./SingleChallenge";

export default function Challenges() {
  const dispatch = useDispatch();
  const allChallenges = useSelector((state) => state.challenges.challenges);
  const user = useSelector((state) => state.session.user);

  console.log("ALL_CHALLENGES: ", allChallenges)

  useEffect(() => {
    dispatch(getAllChallenges());
  }, [dispatch])

  if(!allChallenges || allChallenges.length < 1) return null;

  return (
    <div className="challengesWrapper">
      {user && <div className="challengesPostForm">
        <div className="challengesPostBox">
          <Avatar />
          <div className="challengesPostInputs">
            <input
            className="challengePostTitle"
            placeholder="Title"
            />
            <input
            className="challengePostBody"
            placeholder="Challenge the World..."
            />
          </div>
        </div>
        <button>Challenge +</button>
      </div>}
      {allChallenges.map(challenge => (
        <SingleChallenge key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
