import { meloFetch } from "./utils";

//TYPES
const GET_ALL_GOALS = "goals/getAllGoals";

/******************************************************************************/
//ACTION CREATORS
export const setAllGoals = (goals) => {
  return {
    type: GET_ALL_GOALS,
    payload: goals,
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

/***************************************************************************** */
//REDUCER

const initialState = { goals: [] };
const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GOALS:
      return { goals: action.payload };
    default:
      return state;
  }
};

export default goalsReducer;
