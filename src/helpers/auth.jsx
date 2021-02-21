import {
	getLocalStorage,
	setLocalStorage,
	deleteLocalStorage,
} from "./localStorage";
import { getCookie, setCookie, deleteCookie } from "./cookies";
import { logoutApiCall } from "../api";

// set token in cookie and user info in localstorage
export const setAuth = (token, refreshToken, user) => {
	setLocalStorage("user", user);
	setCookie("token", token);
	setCookie("refreshToken", refreshToken);
};

//check if there are cookie and user
export const isAuthenticated = () => {
	if (getCookie("token") || getLocalStorage("user")) {
		return getLocalStorage("user");
	} else {
		return false;
	}
};

export const logout = async (next) => {
	const response = await logoutApiCall();
	console.log("logout resp: ", response);
	if (!response.data.errors) {
		deleteCookie("token");
		deleteCookie("refreshToken");
		deleteLocalStorage("user");
		next(); //callback function
	}
};