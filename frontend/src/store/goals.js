import { meloFetch, sortGoals } from "./utils";

//TYPES
const GET_ALL_GOALS = "goals/getAllGoals";
const GET_USERS_GOALS = "goals/getUsersGoals";
const ADD_GOAL = "goals/addGoal";
const EDIT_GOAL = "goals/editGoal";
const DELETE_GOAL = "goals/deleteGoal";
const INCREMENT_DOIT = "goals/incrementDoit";
const DECREMENT_DOIT = "goals/decrementDoit";

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

const editGoal = (goal, index) => {
  return {
    type: EDIT_GOAL,
    payload: { goal, index },
  };
};

const removeGoal = (id) => {
  return {
    type: DELETE_GOAL,
    payload: id,
  };
};

const incrementDoit = (id) => {
  return {
    type: INCREMENT_DOIT,
    payload: id,
  };
};

const decrementDoit = (id) => {
  return {
    type: DECREMENT_DOIT,
    payload: id,
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
    console.log("DATA GET USERS GOALS: ", data)
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

export const updateGoal =
  ({ goal, id, index }) =>
  async (dispatch) => {
    const res = await meloFetch(`/api/goals/${id}`, {
      method: "PUT",
      body: JSON.stringify(goal),
    });
    const data = await res.json();

    if (res.ok) {
      dispatch(editGoal(data, index));
    } else {
      return data;
    }
  };

export const deleteGoal = (id) => async (dispatch) => {
  const res = await meloFetch(`/api/goals/${id}`, { method: "DELETE" });
  const data = await res.json();

  if (res.ok) {
    dispatch(removeGoal(id));
  } else {
    return data;
  }
};

export const addDoit = (id) => async (dispatch) => {
  const res = await meloFetch(`/api/goals/${id}/doit`, { method: "POST" });
  const data = await res.json();

  if (res.ok) {
    dispatch(incrementDoit(id));
  } else {
    return data;
  }
};

export const removeDoit = (id) => async (dispatch) => {
  const res = await meloFetch(`/api/goals/${id}/doit`, { method: "DELETE" });
  const data = await res.json();

  if (res.ok) {
    dispatch(decrementDoit(id));
  } else {
    return data;
  }
};

/***************************************************************************** */
//REDUCER

const initialState = { goals: [], usersGoals: [] };
const goalsReducer = (state = initialState, action) => {
  let newUserGoals;
  let newGoals;

  switch (action.type) {
    case GET_ALL_GOALS:
      return { ...state, goals: sortGoals(action.payload) };
    case GET_USERS_GOALS:
      return { goals: state.goals, usersGoals: sortGoals(action.payload) };
    case ADD_GOAL:
      if(state.goals){
        newGoals = [...state.goals]
      }

      return {
        goals: [action.payload, newGoals],
        usersGoals: [action.payload, ...state.usersGoals],
      };
    case EDIT_GOAL:
      newUserGoals = [...state.usersGoals];
      newUserGoals[action.payload.index] = action.payload.goal;

      return {
        goals: state.goals,
        usersGoals: newUserGoals,
      };
    case DELETE_GOAL:
      return {
        goals: state.goals,
        usersGoals: state.usersGoals.filter((goal) => goal.id !== action.payload),
      };
    case INCREMENT_DOIT:
      console.log('STATE: ', state)
      if (state.goals?.length > 0) {
        newGoals = [...state.goals];
        for (const goal of newGoals) {
          if (goal.id === action.payload) {
            // console.log("BEFORE 1ST DO IT: ", goal.doit)
            goal.doit++;
            // console.log("AFTER 1ST DO IT: ", goal.doit)
            break
          }
        }
      }
      if (state.usersGoals?.length > 0) {
        newUserGoals = [...state.usersGoals];
        for (const goal of newUserGoals) {
          if (goal.id === action.payload) {
            // console.log("BEFORE DO IT: ", goal.doit)
            goal.doit++;
            // console.log("AFTER DO IT: ", goal.doit)
            break
          }
        }
      }
      return { goals: newGoals, usersGoals: newUserGoals};

    case DECREMENT_DOIT:
      newGoals = [...state.goals];
      newUserGoals = [...state.usersGoals];

      for (const goal of newGoals) {
        if (goal.id === action.payload) {
          goal.doit--;
        }
      }
      for (const goal of newUserGoals) {
        if (goal.id === action.payload) {
          goal.doit--;
        }
      }
      return { goals: newGoals, usersGoals: newUserGoals };
    default:
      return state;
  }
};

export default goalsReducer;
