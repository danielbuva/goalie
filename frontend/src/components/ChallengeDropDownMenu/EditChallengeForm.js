import { useState } from "react";
import "./EditChallengeForm.css";
import Avatar from "../Avatar";
import { EditChallenge } from "../../store/challenges";
// import { useMenu } from "../Menu";
import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/useModal";

export default function EditChallengeForm({ challenge }) {
  let [title, setTitle] = useState(challenge.title);
  let [body, setBody] = useState(challenge.body);
  // const { toggleMenu } = useMenu();
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  let titleChanger = (e) => {
    setTitle(e.target.value);
  };

  let bodyChanger = (e) => {
    setBody(e.target.value);
  };

  let editChallengeClicker = () => {
    challenge.title = title;
    challenge.body = body;
    dispatch(EditChallenge(challenge));
    closeModal();
  };

  return (
    <div className="editChllengeForm">
      <div className="editChallengeForm-content">
        <div>
          <Avatar />
        </div>
        <div className="editChallengeForm-input-wrapper">
          <input type="text" value={title} onChange={titleChanger} />
          <textarea type="text" value={body} onChange={bodyChanger} />
        </div>
      </div>
      <div className="editChallengeForm-button-holder">
        <button onClick={editChallengeClicker}>Challenge +</button>
      </div>
    </div>
  );
}
