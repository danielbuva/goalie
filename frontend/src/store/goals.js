import { meloFetch } from "./utils";

//TYPES
const GET_ALL_GOALS = "goals/getAllGoals";
const GET_USERS_GOALS = "goals/getUsersGoals";
const ADD_GOAL = "goals/addGoal";

/******************************************************************************/
//ACTION CREATORS
export const setAllGoals = (goals) => {
  return {
    type: GET_ALL_GOALS,
    payload: goals,
  };
};

const setUsersGoals = (goals) => {
  return {
    type: GET_USERS_GOALS,
    payload: goals,
  };
};

const addGoals = (goal) => {
  return {
    type: ADD_GOAL,
    payload: goal,
  };
};

/**************************************************************************** */
//THUNKS
export const getAllGoals = () => async (dispatch) => {
  const response = await meloFetch("/api/goals");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllGoals(data));
  }
};

export const getUsersGoals = (userId) => async (dispatch) => {
  const response = await meloFetch(`/api/goals/${userId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setUsersGoals(data));
  }
};

export const createGoal = (goal) => async (dispatch) => {
  const res = await meloFetch(`/api/goals`, {
    method: "POST",
    body: JSON.stringify(goal),
  });
  const data = await res.json();

  if (res.ok) {
    dispatch(addGoals(data));
  } else {
  }
};

/***************************************************************************** */
//REDUCER

const initialState = { goals: [], usersGoals: [] };
const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GOALS:
      return { ...state, goals: action.payload };
    case GET_USERS_GOALS:
      return { goals: state.goals, usersGoals: action.payload };
    case ADD_GOAL:
      return {
        goals: [action.payload, ...state.goals],
        usersGoals: [action.payload, ...state.usersGoals],
      };
    default:
      return state;
  }
};

export default goalsReducer;
