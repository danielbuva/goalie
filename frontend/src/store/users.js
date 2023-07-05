import { meloFetch } from "./utils";
const SET_USER = "user/setUser";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = (userId) => async (dispatch) => {
  const res = await meloFetch(`api/users/${userId}`);

  if (res.ok) {
    const data = await res.json();
    if (data.errors) {
      return;
    }
    dispatch(setUser(data));
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
