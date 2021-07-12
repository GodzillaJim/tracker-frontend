import { SET_TOKEN, CLEAR_TOKEN, LOGIN, LOGOUT } from "../constants/constants";
export const tokenReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { token: action.payload };
    case CLEAR_TOKEN:
      return { token: "" };
    default:
      return state;
  }
};
export const userReducer = (state = { firstName: "Jon" }, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload };
    case LOGOUT:
      return { user: {} };
    default:
      return state;
  }
};
