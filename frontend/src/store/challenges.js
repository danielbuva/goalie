import { meloFetch } from "./utils";

//TYPES

const GET_ALL_CHALLENGES = "challenges/getAllChallenges";
const GET_USERS_CHALLENGES = "challenges/getUsersChallenges";
const SET_SINGLE_CHALLENGE = "challenges/getSinleChallenge";
const JOIN_CHALLENGE = "challenges/joinChallenge";
const LEAVE_CHALLENGE = "challenges/leaveChallenge";
const EDIT_CHALLENGE = "challenges/editChallenge";

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

const setJoinedChallenge = (participant) => {
  return {
    type: JOIN_CHALLENGE,
    payload: participant,
  };
};

const setLeftChallenge = (challengeId, userId) => {
  return {
    type: LEAVE_CHALLENGE,
    payload: {
      challengeId,
      userId,
    },
  };
};

const editChallenge = (challenge) => {
  return {
    type: EDIT_CHALLENGE,
    payload: challenge,
  };
};
//THUNK
export const getAllChallenges = () => async (dispatch) => {
  const response = await meloFetch("/api/challenges/");

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
    dispatch(setJoinedChallenge(data));
  }
};

export const LeaveChallenge = (challengeId, userId) => async (dispatch) => {
  let response = await meloFetch(`/api/challenges/${challengeId}/participant`, {
    method: "DELETE",
  });
  if (response.ok) {
    let data = await response.json();
    dispatch(setLeftChallenge(challengeId, userId));
    return;
  }
};

export const EditChallenge = (challenge) => async (dispatch) => {
  let response = await meloFetch(`/api/challenges/${challenge.id}`, {
    method: "PUT",
    body: JSON.stringify(challenge),
  });

  if (response.ok) {
    let data = await response.json();
  }
};

//REDUCER

const initialState = {
  challenges: [],
  userChallenges: [],
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
      return { ...state, userChallenges: action.payload };
    case SET_SINGLE_CHALLENGE:
      return {
        challenges: [action.payload, ...state.challenges],
        userChallenges: [action.payload, ...state.userChallenges],
      };
    case JOIN_CHALLENGE:
      let challenge = state.challenges.find(
        (challenge) => challenge.id == action.payload.challengeId
      );
      console.log("challenge", challenge);
      let userChallenge = state.userChallenges.find(
        (challenge) => challenge.id == action.payload.challengeId
      );
      console.log("userchallgne", userChallenge);
      challenge.allParticipants = [
        ...challenge.allParticipants,
        action.payload,
      ];
      if (userChallenge) {
        userChallenge.allParticipants = [
          ...userChallenge.allParticipants,
          action.payload,
        ];
      }
      return {
        challenges: [...state.challenges],
        userChallenges: [...state.userChallenges],
      };
    case LEAVE_CHALLENGE:
      return state;
    default:
      return state;
  }
};

export default challengesReducer;