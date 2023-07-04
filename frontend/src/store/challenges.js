import { meloFetch } from "./utils";

//TYPES

const GET_ALL_CHALLENGES = "challenges/getAllChallenges";
const GET_USERS_CHALLENGES = "challenges/getUsersChallenges";
const SET_SINGLE_CHALLENGE = "challenges/getSinleChallenge";

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

const setSingleChallenge = (challenge) => {
  return {
    type: SET_SINGLE_CHALLENGE,
    payload: challenge,
  };
};
//THUNK
export const getAllChallenges = () => async (dispatch) => {
  const response = await meloFetch("/api/challenges/");
  console.log("inside");
  if (response.ok) {
    const data = await response.json();
    console.log("data", data);
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

export const CreateSingleChallenge = (challenge) => async (dispatch) => {
  const response = await meloFetch("/api/challenges/new", {
    method: "POST",
    body: JSON.stringify(challenge),
  });
  console.log("inside");
  if (response.ok) {
    const data = await response.json();
    dispatch(setSingleChallenge(data));
  }
};

export const JoinChallenge = (challengeId) => async (dispatch) => {
  const response = await meloFetch(
    `/api/challenges/${challengeId}/participants`,
    {
      method: "POST",
      body: {},
    }
  );

  if (response.ok) {
    let data = await response.json();
    return data;
  }
};

//REDUCER

const initialState = {
  challenges: [],
  userChallenges: [],
  singleChallenge: null,
};
const challengesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHALLENGES:
      // const obj = {};
      // action.payload.forEach((item) => {
      //   obj[item.id] = item;
      // });
      return { ...state, challenges: action.payload };
    case GET_USERS_CHALLENGES:
      // const obj2 = {};
      // action.payload.forEach((item) => {
      //   obj2[item.id] = item;
      // });
      return { ...state, challenges: action.payload };
    case SET_SINGLE_CHALLENGE:
      return { ...state, challenges: [action.payload, ...state.challenges] };
    default:
      return state;
  }
};

export default challengesReducer;
