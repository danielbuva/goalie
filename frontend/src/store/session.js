import { meloFetch } from "./utils";
// constants
const SET_SESSION = "session/setSession";
const REMOVE_SESSION = "session/removeSession";

export const setSession = (user) => ({
  type: SET_SESSION,
  payload: user,
});

const removeSession = () => ({
  type: REMOVE_SESSION,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setSession(data));
  }
};

export const login = (credential, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setSession(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeSession());
  }
};

export const signUp = (body) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setSession(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const Unfollow = (userId) => async (dispatch) => {
  let response = await meloFetch(`/api/users/${userId}/following`, {
    method: "DELETE",
  });
  // let newRes = await response.json();

  const response2 = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response2.ok) {
    const data = await response2.json();
    if (data.errors) {
      return;
    }

    dispatch(setSession(data));
  }
};

export const CreateFollower = (userId) => async (dispatch) => {
  let follow = await meloFetch(`/api/users/${userId}/follow`, {
    method: "POST",
    body: JSON.stringify({}),
  });

  let followdata = await follow.json();

  const response2 = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response2.ok) {
    const data = await response2.json();
    if (data.errors) {
      return;
    }

    dispatch(setSession(data));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SESSION:
      return { user: action.payload };
    case REMOVE_SESSION:
      return { user: null };
    default:
      return state;
  }
}
