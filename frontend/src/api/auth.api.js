import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const login = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, data);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);
  return res.data;
};

export const getMe = async () => {
  const res = await axiosInstance.get(API_ROUTES.AUTH.ME);
  return res.data;
};

export const registerGuide = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.REGISTER_GUIDE, data);
  return res.data;
}

export const registerTourist = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.REGISTER_TOURIST, data);
  return res.data;
}

export const register = async (data, role="tourist") => {
  const res = role.toLowerCase() === "tourist" ? await registerTourist(data) : await registerGuide(data);
  return res;
}