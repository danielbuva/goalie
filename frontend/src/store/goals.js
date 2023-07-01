import { meloFetch } from "./utils";

//TYPES
const GET_ALL_GOALS = "goals/getAllGoals";
const GET_USERS_GOALS = "goals/getUsersGoals"

/******************************************************************************/
//ACTION CREATORS
export const setAllGoals = (goals) => {
  return {
    type: GET_ALL_GOALS,
    payload: goals,
  };
};

const setUsersGoals = (goals) => {
    return{
        type: GET_USERS_GOALS,
        payload: goals
    }
}

/**************************************************************************** */
//THUNKS
export const getAllGoals = () => async (dispatch) => {
  const response = await meloFetch("/api/goals");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllGoals(data));
  }
};

export const getUsersGoals = (userId) => async(dispatch) =>{
    const response = await meloFetch(`/api/goals/${userId}`);

    if(response.ok) {
        const data = await response.json();
        dispatch(setUsersGoals(data))
    }
}

/***************************************************************************** */
//REDUCER

const initialState = { goals: [], usersGoals: [] };
const goalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_GOALS:
      return { goals: action.payload };
    case GET_USERS_GOALS:
        return {goals: state.goals, usersGoals: action.payload}
    default:
      return state;
  }
};

export default goalsReducer;
