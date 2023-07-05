import { updateCompleteStatus } from "../../../store/goals";
import useSessionUser from "../../../hooks/useSessionUser";
import useGoals from "../../../hooks/useGoals";
import React from "react";
import { useDispatch } from "react-redux";

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
  const goals = useGoals();

  if (goals.length < 1) return null;

  const yourGoals = goals.filter((g) => {
    if (g.user) {
      return g.user.id === currentUser?.id;
    }
    return g;
  });

  return (
    <div id="your-goals">
      <h2 id="your-goals-header">
        Your Goals <span>({yourGoals.length})</span>
      </h2>
      <GoalList goals={sortByCompleted(yourGoals)} />
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
