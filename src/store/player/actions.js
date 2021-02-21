import { SELECTED_SONGS } from "./constants";

export const selectedSong = (track) => ({
  type: SELECTED_SONGS,
  payload: track,
});
