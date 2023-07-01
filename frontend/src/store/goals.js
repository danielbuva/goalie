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
  const data = await response.json();

  if (response.ok && data) {
    console.log("DATA: ", data);
    dispatch(setAllGoals(data));
  }
};

/***************************************************************************** */
//REDUCER

const initialState = { goals: [] };
const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GOALS:
        console.log('ACTION.PAYLOAD: ', action.payload)
      return { goals: action.payload };
    default:
      return state;
  }
};

export default goalsReducer;
