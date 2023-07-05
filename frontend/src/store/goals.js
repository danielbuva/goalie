import { meloFetch, sortGoals } from "./utils";

//TYPES
const GET_ALL_GOALS = "goals/getAllGoals";
const GET_USERS_GOALS = "goals/getUsersGoals";
const ADD_GOAL = "goals/addGoal";
const EDIT_GOAL = "goals/editGoal";
const DELETE_GOAL = "goals/deleteGoal";
const INCREMENT_DOIT = "goals/incrementDoit";
const DECREMENT_DOIT = "goals/decrementDoit";
const SET_COMPLETE_STATUS = "goals/setStatus";

/******************************************************************************/
//ACTION CREATORS
export const setAllGoals = (goals, userId) => {
  return {
    type: GET_ALL_GOALS,
    payload: { goals, userId },
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

const incrementDoit = (id, userId) => {
  return {
    type: INCREMENT_DOIT,
    payload: { id, userId },
  };
};

const decrementDoit = (id, userId) => {
  return {
    type: DECREMENT_DOIT,
    payload: { id, userId },
  };
};

const setCompleteStatus = (id, status) => {
  return {
    type: SET_COMPLETE_STATUS,
    payload: { id, status },
  };
};

/**************************************************************************** */
//THUNKS
export const getAllGoals = (userId) => async (dispatch) => {
  const response = await meloFetch("/api/goals");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllGoals(data, userId));
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
    return data;
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

  if (res.ok) {
    dispatch(removeGoal(id));
  } else {
    return await res.json();
  }
};

export const addDoit = (id, userId) => async (dispatch) => {
  const res = await meloFetch(`/api/goals/${id}/doit`, { method: "POST" });

  if (res.ok) {
    dispatch(incrementDoit(id, userId));
  } else {
    return await res.json();
  }
};

export const removeDoit = (id, userId) => async (dispatch) => {
  const res = await meloFetch(`/api/goals/${id}/doit`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(decrementDoit(id, userId));
  } else {
    return await res.json();
  }
};

export const updateCompleteStatus = (id, status) => async (dispatch) => {
  const res = await meloFetch(`/api/goals/${id}/complete`, {
    method: "PUT",
    body: JSON.stringify({ completed: status }),
  });
  if (res.ok) {
    dispatch(setCompleteStatus(id, status));
  } else {
    return await res.json();
  }
};

/***************************************************************************** */
//REDUCER

const initialState = { goals: [], usersGoals: [] };
const goalsReducer = (state = initialState, action) => {
  let newUserGoals = [];
  let newGoals = [];

  switch (action.type) {
    case GET_ALL_GOALS:
      if (action.payload.userId) {
        newUserGoals = sortGoals(
          action.payload.goals.filter(
            (g) => g.user.id === action.payload.userId
          )
        );
      }
      return {
        goals: sortGoals(action.payload.goals),
        usersGoals: newUserGoals,
      };

    case GET_USERS_GOALS:
      newUserGoals = sortGoals(action.payload);
      if (state.goals.length < 1) {
        return { goals: newUserGoals, usersGoals: newUserGoals };
      }
      return { goals: state.goals, usersGoals: newUserGoals };

    case ADD_GOAL:
      newGoals = state.goals ? [...state.goals] : [];
      return {
        goals: [action.payload, ...newGoals],
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
        usersGoals: state.usersGoals.filter(
          (goal) => goal.id !== action.payload
        ),
      };
    case INCREMENT_DOIT:
      if (state.goals?.length > 0) {
        newGoals = state.goals.map((goal) => {
          if (goal.id === action.payload.id) {
            return {
              ...goal,
              doit: [...goal.doit, action.payload.userId],
            };
          }
          return goal;
        });
      }

      if (state.usersGoals?.length > 0) {
        newUserGoals = state.usersGoals.map((goal) => {
          if (goal.id === action.payload.id) {
            return {
              ...goal,
              doit: [...goal.doit, action.payload.userId],
            };
          }
          return goal;
        });
      }

      return { goals: newGoals, usersGoals: newUserGoals };

    case DECREMENT_DOIT:
      if (state.goals?.length > 0) {
        newGoals = state.goals.map((goal) => {
          if (goal.id === action.payload.id) {
            return {
              ...goal,
              doit: goal.doit.filter(
                (doit) => doit !== action.payload.userId
              ),
            };
          }
          return goal;
        });
      }

      if (state.usersGoals?.length > 0) {
        newUserGoals = state.usersGoals.map((goal) => {
          if (goal.id === action.payload.id) {
            return {
              ...goal,
              doit: goal.doit.filter(
                (doit) => doit !== action.payload.userId
              ),
            };
          }
          return goal;
        });
      }

      return { goals: newGoals, usersGoals: newUserGoals };

    case SET_COMPLETE_STATUS:
      if (state.goals?.length > 0) {
        newGoals = state.goals.map((goal) => {
          if (goal.id === action.payload.id) {
            return {
              ...goal,
              completed: action.payload.status,
            };
          }
          return goal;
        });
      }

      if (state.usersGoals?.length > 0) {
        newUserGoals = state.usersGoals.map((goal) => {
          if (goal.id === action.payload.id) {
            return {
              ...goal,
              completed: action.payload.status,
            };
          }
          return goal;
        });
      }

      return { goals: newGoals, usersGoals: newUserGoals };

    default:
      return state;
  }
};

export default goalsReducer;
