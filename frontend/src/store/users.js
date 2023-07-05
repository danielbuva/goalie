import { meloFetch } from "./utils";
const SET_USER = "user/setUser";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = (userId) => async (dispatch) => {
  console.log("ENTERING-1");
  const res = await meloFetch(`api/users/${userId}`);
  console.log("entering0");

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data));
  } else if (res.status === 404) {
    window.location.href = "/not-found";
  }
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    default:
      return state;
  }
}
