import { updateCompleteStatus } from "../../../store/goals";
import useSessionUser from "../../../hooks/useSessionUser";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";

import "./YourGoals.css";

function sortByCompleted(goals) {
  return goals.sort((a, b) => {
    if (a.completed === b.completed) {
      return 0;
    } else if (a.completed) {
      return 1;
    }
    return -1;
  });
}

function YourGoals() {
  const currentUser = useSessionUser();
  const goals = useSelector((s) => s.goals.currentUserGoals);

  if (!goals || goals.length < 1 || !currentUser) return null;

  return (
    <div id="your-goals">
      <h2 id="your-goals-header">
        Your Goals <span>({goals.length})</span>
      </h2>
      <div id="goal-list-wrapper">
        <GoalList goals={sortByCompleted(goals)} />
      </div>
    </div>
  );
}

function GoalList({ goals }) {
  const dispatch = useDispatch();

  const handleCheck = (goalId, completed) => {
    dispatch(updateCompleteStatus(goalId, !completed));
  };

  return (
    <div id="your-goals-list">
      {goals.map((goal) => (
        <Goal goal={goal} handleCheck={handleCheck} key={goal.id} />
      ))}
    </div>
  );
}

function Goal({ goal, handleCheck }) {
  return (
    <div
      className="list-item"
      onClick={() => {
        handleCheck(goal.id, goal.completed);
      }}
    >
      <div className="list-goal">
        <h5 className="item-title">{goal.title}</h5>
        <p className="item-goal-body">{goal.body}</p>
        <p className="item-doit">doit {goal.doit.length}</p>
      </div>
      <input
        className="item-check-box"
        type="checkbox"
        onChange={() => handleCheck(goal.id, goal.completed)}
        checked={goal.completed}
      />
    </div>
  );
}

export default YourGoals;
