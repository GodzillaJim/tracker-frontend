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
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../constants/constants";
import axios from "axios";

export const registerAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: SET_TOKEN_REQUEST });
    const { data } = await axios.post("/api/users/register", {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      image: user.image,
    });
    dispatch({ type: SET_TOKEN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: SET_TOKEN_FAIL, payload: error });
  }
};

export const loginAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: SET_TOKEN_REQUEST });
    const { data } = await axios.post("/api/users/login", {
      email: user.email,
      password: user.password,
    });
    dispatch({ type: SET_TOKEN_SUCCESS, payload: data.token });
  } catch (error) {
    dispatch({ type: SET_TOKEN_FAIL, payload: error });
  }
};

export const uploadImageAction = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_IMAGE_REQUEST });
    const { data } = await axios.post("/api/users/file", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPLOAD_IMAGE_FAIL, payload: error });
  }
};

export const getProfileAction = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROFILE_REQUEST });
    const { data } = await axios.get("/api/users/profile", {
      headers: { Authorization: "Bearer " + token },
    });
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_FAIL, payload: error });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL });
  }
};
