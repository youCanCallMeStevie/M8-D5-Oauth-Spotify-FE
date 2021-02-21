import { SELECTED_SONGS } from "./constants";

const playerReducer = (state = { track: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_SONGS:
      return { ...state, track: payload };
    default:
      return state;
  }
};

export default playerReducer;
