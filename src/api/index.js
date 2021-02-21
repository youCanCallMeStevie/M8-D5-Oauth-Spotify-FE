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

export const register = async (data) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BE_DEV_URL}/register`,
      data,
      config
    );
    console.log("response.data: ", response.data);
    if (response.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log("error response data", error.response.data);
    return error.response.data;
  }
};

export const login = async (data) => {
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/login`,
    data,
    config
  );

  return response;
};

export const logoutApiCall = async () => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };
  const data = { refreshToken: getCookie("refreshToken") };
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/logoutAll`,
    data,
    config
  );
  console.log("Logout response is : ", response.data);
  return response;
};
