import {
  LIKED_SONG,
  REJECTED_SONG,
  SET_USER_DETAILS,
  LOGGED_IN,
  CREATE_PLAYLIST,
  ADD_TO_PLAYLIST,
  TOGGLE_LIKED_SONG,
} from "./constants";

const userReducer = (
  state = { liked: [], details: {}, login: false, playlists:[] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case LIKED_SONG:
      return { ...state, liked: state.liked.concat(payload) };
    case SET_USER_DETAILS:
      return {
        ...state,
        details: {
          ...state.details,
          username: payload.username,
          password: payload.password,
        },
      };
    case LOGGED_IN:
      return { ...state, login: !state.login };
    case REJECTED_SONG:
      return {
        ...state,
        liked: state.liked.filter((liked) => liked !== payload),
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.concat(payload)
      }
    case ADD_TO_PLAYLIST:
      let index = state.playlists.findIndex((playlist) => playlist.name === payload.name)
      state.playlists[index] = { ...state.playlists[index], tracksList: state.playlists[index].tracksList.concat(payload.tracks) }
      let playlists
      index === 0
        ? playlists = [state.playlists[index], ...state.playlists.slice(index + 1)]
        : playlists = [...state.playlists.slice(0, index), state.playlists[index], ...state.playlists.slice(index + 1)]
      return {
        ...state,
        playlists: playlists
      }
    case TOGGLE_LIKED_SONG:
      return {
        ...state,
        liked: state.liked.some((song) => song.id === payload.id)
          ? state.liked.filter((song) => song.id !== payload.id)
          : state.liked.concat(payload),
      };
    default:
      return state;
  }
};

export default userReducer;
