import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  uploadImageReducer,
  setTokenReducer,
  getProfileReducer,
} from "./reducer/reducers";

const reducer = combineReducers({
  uploadImage: uploadImageReducer,
  setToken: setTokenReducer,
  getProfile: getProfileReducer,
});

const initialState = {
  uploadImage: localStorage.getItem("image")
    ? localStorage.getItem("image")
    : "default-image.png",
  setToken: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  getProfile: localStorage.getItem("profile")
    ? localStorage.getItem("profile")
    : { user: null },
};

const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
