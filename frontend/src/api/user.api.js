import axiosI from "./axios.config.js";
import API_ROUTES from "./routes.js";

export const getAllUsers = async (query) => {
    const res = await axiosI.get(API_ROUTES.USER.GET_ALL(query))
    return res.data;
}

export const getUserById = async (id) => {
    const res = await axiosI.get(API_ROUTES.USER.GET(id))
    return res.data;
}

export const updateUser = async () => {
    const res = await axiosI.put(API_ROUTES.USER.BASE)
    return res.data;
}

export const deleteUser = async () => {
    const res = await axiosI.delete(API_ROUTES.USER.BASE)
}