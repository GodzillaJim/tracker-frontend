import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { tokenReducer, userReducer } from "./reducer/reducers";

const reducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  user: localStorage.getItem("user") ? localStorage.getItem("user") : {},
};

const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);
export default store;
