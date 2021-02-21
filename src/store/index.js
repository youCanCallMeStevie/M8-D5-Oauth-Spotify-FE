import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer from "./user/reducer";
import playerReducer from "./player/reducer";
import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
});

export default createStore(
  rootReducer,
  composedEnhancer(applyMiddleware(thunk))
);
