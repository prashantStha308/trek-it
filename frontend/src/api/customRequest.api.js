import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const sendCustomRequest = async (data) => {
    const res = await axiosInstance.post(API_ROUTES.CUSTOM_REQUEST.CREATE, data);
    return res.data.data;
};

export const getMyCustomRequests = async () => {
    const res = await axiosInstance.get(API_ROUTES.CUSTOM_REQUEST.GET_MINE());
    return res.data.data;
};

export const acceptCustomRequest = async (requestId) => {
    const res = await axiosInstance.patch(API_ROUTES.CUSTOM_REQUEST.ACCEPT(requestId));
    return res.data.data;
};

export const rejectCustomRequest = async (requestId) => {
    const res = await axiosInstance.patch(API_ROUTES.CUSTOM_REQUEST.REJECT(requestId));
    return res.data.data;
};

export const withdrawCustomRequest = async (requestId) => {
    const res = await axiosInstance.delete(API_ROUTES.CUSTOM_REQUEST.WITHDRAW(requestId));
    return res.data.data;
};
