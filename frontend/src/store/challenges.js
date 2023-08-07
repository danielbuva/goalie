import { meloFetch } from "./utils";

//TYPES

const GET_ALL_CHALLENGES = "challenges/getAllChallenges";
const GET_USERS_CHALLENGES = "challenges/getUsersChallenges";
const SET_SINGLE_CHALLENGE = "challenges/getSinleChallenge";
const JOIN_CHALLENGE = "challenges/joinChallenge";
const LEAVE_CHALLENGE = "challenges/leaveChallenge";
const EDIT_CHALLENGE = "challenges/editChallenge";
const DELETE_CHALLENGE = "challenges/deleteChallenge";
const COMPLETED_CHALLENGE = "challenges/completedChallenge";

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

const removeChallenge = (challengeId) => {
  return {
    type: DELETE_CHALLENGE,
    payload: challengeId,
  };
};

const setCompletedChallenge = (id, status, userId) => {
  return {
    type: COMPLETED_CHALLENGE,
    payload: { id, status, userId },
  };
};

//THUNK
export const getAllChallenges = () => async (dispatch) => {
  const response = await meloFetch("/api/challenges/");

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

export const CreateSingleChallenge = (challenge) => async (dispatch) => {
  const response = await meloFetch("/api/challenges/new", {
    method: "POST",
    body: JSON.stringify(challenge),
  });
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
    // let data = await response.json();
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
    dispatch(editChallenge(data));
  }
};

export const DeleteChallenge = (challengeId) => async (dispatch) => {
  let response = await meloFetch(` /api/challenges/${challengeId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(removeChallenge(challengeId));
  }
};

export const CompleteChallenge = (id, status, userId) => async (dispatch) => {
  const res = await meloFetch(`/api/challenges/${id}/complete`, {
    method: "PUT",
    body: JSON.stringify({ completed: status }),
  });

  if (res.ok) {
    // let data = await res.json();
    dispatch(setCompletedChallenge(id, status, userId));
  }
};

// export const CreateFollower = (userId) => async (dispatch) => {
//   let follow = await meloFetch(`/api/users/${userId}/follow`, {
//     method: "POST",
//     body: JSON.stringify({}),
//   });

//   let followdata = await follow.json();

//   const response = await meloFetch("/api/challenges/");

//   if (response.ok) {
//     const data = await response.json();
//     await dispatch(setAllChallenges(data));
//   }

//   const response2 = await meloFetch(`/api/challenges/participants/${userId}`);

//   if (response2.ok) {
//     const data = await response2.json();
//     dispatch(setUserChallenges(data));
//   }
// };

// export const CreateUserFollower = (userId) => async (dispatch) => {
//   await meloFetch(`/api/users/${userId}/follow`, {
//     method: "POST",
//     body: JSON.stringify({}),
//   });

//   const response2 = await meloFetch(`/api/challenges/participants/${userId}`);

//   if (response2.ok) {
//     const data = await response2.json();
//     dispatch(setUserChallenges(data));
//   }
// };

// export const Unfollow = (userId) => async (dispatch) => {
//   let response = await meloFetch(`/api/users/${userId}/following`, {
//     method: "DELETE",
//   });
//   let newRes = await response.json();

//   if (response.ok) {
//     const response2 = await meloFetch("/api/challenges/");

//     if (response2.ok) {
//       const data = await response2.json();
//       dispatch(setAllChallenges(data));
//     }
//   }
// };
//REDUCER

const initialState = {
  challenges: [],
  userChallenges: [],
};
const challengesReducer = (state = initialState, action) => {
  let challenge;
  let userChallenge;
  let challengeIndex;
  let userChallengeIndex;
  let allChallenges = [];
  let allUserChallenges = [];
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
      challenge = state.challenges.find(
        (challenge) => challenge.id === action.payload.challengeId
      );
      userChallenge = state.userChallenges.find(
        (challenge) => challenge.id === action.payload.challengeId
      );
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
        challenges: state.challenges.map((challenge) => ({ ...challenge })),
        userChallenges: state.userChallenges.map((challenge) => ({
          ...challenge,
        })),
      };
    case LEAVE_CHALLENGE:
      challenge = state.challenges.find(
        (challenge2) => challenge2.id === action.payload.challengeId
      );
      let participantIndex = challenge.allParticipants.findIndex(
        (participant) => participant.userId === action.payload.userId
      );
      challenge.allParticipants.splice(participantIndex, 1);

      userChallenge = state.userChallenges.find(
        (challenge) => challenge.id === action.payload.challengeId
      );
      let userParticipantIndex = -1;
      if (userChallenge) {
        userParticipantIndex = userChallenge.allParticipants.findIndex(
          (participant) => participant.userId === action.payload.userId
        );
      }

      if (userParticipantIndex > -1) {
        userChallenge.allParticipants.splice(userParticipantIndex, 1);
      }
      return {
        challenges: state.challenges.map((challenge) => ({ ...challenge })),
        userChallenges: state.userChallenges.map((challenge) => ({
          ...challenge,
        })),
      };
    case EDIT_CHALLENGE:
      challengeIndex = state.challenges.findIndex(
        (challenge) => challenge.id === action.payload.id
      );
      state.challenges.splice(challengeIndex, 1, action.payload);
      userChallengeIndex = state.userChallenges.findIndex(
        (challenge) => challenge.id === action.payload.id
      );
      state.userChallenges.splice(userChallengeIndex, 1, action.payload);
      return {
        challenges: [...state.challenges],
        userChallenges: [...state.userChallenges],
      };
    case DELETE_CHALLENGE:
      challengeIndex = state.challenges.findIndex(
        (challenge) => challenge.id === action.payload
      );
      userChallengeIndex = state.userChallenges.findIndex(
        (challenge) => challenge.id === action.payload
      );
      state.challenges.splice(challengeIndex, 1);
      if (userChallengeIndex > -1) {
        state.userChallenges.splice(userChallengeIndex, 1);
      }
      return {
        challenges: [...state.challenges],
        userChallenges: [...state.userChallenges],
      };
    case COMPLETED_CHALLENGE:
      if (state.challenges?.length > 0) {
        allChallenges = state.challenges.map((challenge) => {
          if (challenge.id === action.payload.id) {
            return {
              ...challenge,
              allParticipants: challenge.allParticipants.map((particpant) => {
                if (particpant.userId === action.payload.userId) {
                  return {
                    ...particpant,
                    completed: action.payload.status,
                  };
                }
                return particpant;
              }),
            };
          }
          return challenge;
        });
      }

      if (state.userChallenges?.length > 0) {
        allUserChallenges = state.userChallenges.map((challenge) => {
          if (challenge.id === action.payload.id) {
            return {
              ...challenge,
              allParticipants: challenge.allParticipants.map((particpant) => {
                if (particpant.userId === action.payload.userId) {
                  return {
                    ...particpant,
                    completed: action.payload.status,
                  };
                }
                return particpant;
              }),
            };
          }
          return challenge;
        });
      }

      return { challenges: allChallenges, userChallenges: allUserChallenges };
    default:
      return state;
  }
};

export default challengesReducer;
