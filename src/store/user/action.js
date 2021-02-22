import {
  LIKED_SONG,
  REJECTED_SONG,
  SET_USER_DETAILS,
  LOGGED_IN,
  CREATE_PLAYLIST,
  ADD_TO_PLAYLIST,
  TOGGLE_LIKED_SONG,
  LOGIN
} from "./constants";

import { getUserInfo } from "../../api";
export const setUserDetails = (username, password) => ({
  type: SET_USER_DETAILS,
  payload: { username, password },
});
export const isLoggedIn = () => ({ type: LOGGED_IN });
export const logUserIn = () => async dispatch => {
  try {
    const user = await getUserInfo();
    // console.log(user);
    dispatch({
      type:LOGIN,
      payload:user
    })
  } catch (error) {
    console.log(error);
  }
};
export const likedSong = song => ({ type: LIKED_SONG, payload: song });
export const removedSong = song => ({ type: REJECTED_SONG, payload: song });
export const createPlaylist = name => ({
  type: CREATE_PLAYLIST,
  payload: { name: name, trackslist: [] },
});
export const addToPlaylist = (name, tracks) => ({
  type: ADD_TO_PLAYLIST,
  payload: { name: name, track: tracks },
});
export const toggleLikeSong = song => ({
  type: TOGGLE_LIKED_SONG,
  payload: song,
});
