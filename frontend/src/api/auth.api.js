import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";
import {showToast} from "@/store/ui.store";


export const login = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, data);
  return res?.data;  
};

export const logout = async () => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
  console.log("logout: ",res);

  return res?.data;
};

export const getMe = async () => {
    const res = await axiosInstance.get(API_ROUTES.USER.ME);
    return res?.data?.data;
}

export const registerGuide = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.REGISTER_GUIDE, data);
  return res;
}

export const registerTourist = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.REGISTER_TOURIST, data);
  return res;
}

export const register = async (data, role="tourist") => {
  const res = role.toLowerCase() === "tourist" ? await registerTourist(data) : await registerGuide(data);
  return res?.data?.data;
}