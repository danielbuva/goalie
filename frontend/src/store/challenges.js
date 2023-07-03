import { meloFetch } from "./utils";

//TYPES

const GET_ALL_CHALLENGES = "challenges/getAllChallenges";
const GET_USERS_CHALLENGES = "challenges/getUsersChallenges";

//ACTIONS

const setAllChallenges = (challenges) => {
  return {
    type: GET_ALL_CHALLENGES,
    payload: challenges.Challenges,
  };
};

const setUserChallenges = (challenges) => {
  return {
    type: GET_USERS_CHALLENGES,
    payload: challenges.Challenges,
  };
};

//THUNK
export const getAllChallenges = () => async (dispatch) => {
  const response = await meloFetch("/api/challenges");

  if (response.ok) {
    const data = await response.json();
    dispatch(setAllChallenges(data));
  }
};

export const getUserChallenges = (participantId) => async (dispatch) => {
  const response = await meloFetch(
    `/api/challenges/participants/${participantId}`
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(setUserChallenges(data));
  }
};

//REDUCER

const initialState = { challenges: [], userChallenges: [] };
const challengesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHALLENGES:
      const obj = {};
      action.payload.forEach((item) => {
        obj[item.id] = item;
      });
      return { ...state, challenges: obj };
    case GET_USERS_CHALLENGES:
      const obj2 = {};
      action.payload.forEach((item) => {
        obj2[item.id] = item;
      });
      return { ...state, challenges: obj2 };
    default:
      return state;
  }
};

export default challengesReducer;
