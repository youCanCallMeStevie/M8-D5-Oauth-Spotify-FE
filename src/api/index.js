import axios from "axios";
import { getCookie } from "../helpers/cookies";

export const getSearch = async (query) => {
  const response = await fetch(
    `${process.env.REACT_APP_DEEZER_BASE_URL}/search?search=${query}`
  );
  const result = await response.json();
  // console.log(result);
  return result;
};

export const getAlbum = async (albumId) => {
  const response = await fetch(
    `${process.env.REACT_APP_DEEZER_BASE_URL}/album?albumId=${albumId}`
  );
  const result = await response.json();
  // console.log(result);
  return result;
};

export const getArtist = async (artistId) => {
  const response = await fetch(
    `${process.env.REACT_APP_DEEZER_BASE_URL}/artist?artistId=${artistId}`
  );
  const result = await response.json();
  // console.log(result);
  return result;
};

export const getUserInfo= async ()=>{
  try {
    const res = await axios.get(`${process.env.REACT_APP_BE_URL}/me`, {
      withCredentials: true
    })
    const data = await res.data
    // console.log(data)
  } catch (error) {
    console.log(error);
    
  }
}