import {
  SET_TOKEN_REQUEST,
  SET_TOKEN_SUCCESS,
  SET_TOKEN_FAIL,
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  LOGIN,
} from "../constants/constants";
export const setTokenReducer = (state = { token: null }, action) => {
  switch (action.type) {
    case SET_TOKEN_REQUEST:
      return { loading: true };
    case SET_TOKEN_SUCCESS:
      return { token: action.payload, loading: false };
    case SET_TOKEN_FAIL:
      return { token: null, error: action.payload, loading: false };
    case LOGOUT_REQUEST:
      return { token: null, loading: false };
    default:
      return state;
  }
};

export const getProfileReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true, user: null };
    case GET_PROFILE_SUCCESS:
      return { user: action.payload, loading: false };
    case GET_PROFILE_FAIL:
      return { user: null, error: action.payload, loading: false };
    case LOGOUT_REQUEST:
      return { user: null, loading: false };
    default:
      return state;
  }
};

export const uploadImageReducer = (
  state = { image: "/default-image.png" },
  action
) => {
  switch (action.type) {
    case UPLOAD_IMAGE_REQUEST:
      return { image: "/default-image.png", loading: true, success: false };
    case UPLOAD_IMAGE_SUCCESS:
      return { image: action.payload, loading: false, success: true };
    case UPLOAD_IMAGE_FAIL:
      return {
        image: "/default-image.png",
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};
