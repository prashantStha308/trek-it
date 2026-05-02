import axiosInstance from "../config/axios.config.js";
import { getAllResource } from "./resource.api.js";
import API_ROUTES from "./routes.js";

export const getAllUsers = async (query) => {
    const res = await getAllResource("user", query)
    return res.data;
}

export const getUserById = async (id) => {
    const res = await axiosInstance.get(API_ROUTES.USER.GET(id))
    return res.data;
}

export const updateUser = async () => {
    const res = await axiosInstance.put(API_ROUTES.USER.BASE)
    return res.data;
}

export const deleteUser = async () => {
    const res = await axiosInstance.delete(API_ROUTES.USER.BASE)
}