
import { setSession } from "./session";
import { meloFetch } from "./utils";
const SET_USER = "user/setUser";
const EDIT_USER = "user/editUser"

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const editUser = (user) =>({
  type: EDIT_USER,
  payload: user
})

export const getUser = (userId) => async (dispatch) => {
  const res = await meloFetch(
    `${window.location.origin}/api/users/${userId}`
  );

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data));
  } else if (res.status === 404) {
    window.location.href = "/not-found";
  }
};

export const updateUser = (user) => async(dispatch) =>{
  const res = await meloFetch(`/api/users/${user.id}`, {method: 'PUT', body: JSON.stringify(user)})

  if(res.ok){
    const data = await res.json();
    dispatch(editUser(data))
    dispatch(setSession(data))
  }
}


const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case EDIT_USER:
      return {user: action.payload}
    default:
      return state;
  }
}
