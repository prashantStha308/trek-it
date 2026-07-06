import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const sendCollabRequest = async (data) => {
    const res = await axiosInstance.post(API_ROUTES.COLLAB.CREATE, data);
    return res.data.data;
};

export const getCollabRequests = async (query) => {
    const res = await axiosInstance.get(API_ROUTES.COLLAB.GET_ALL(query));
    return res.data.data;
};

export const getMyCollabRequests = async (query) => {
    const res = await axiosInstance.get(API_ROUTES.COLLAB.GET_MINE(query));
    return res.data.data;
};

export const getGuideCollaboratingPackages = async (guideId) => {
    const res = await axiosInstance.get(API_ROUTES.GUIDE.GET_COLLABORATIONS(guideId));
    return res.data.data;
};

export const acceptCollabRequest = async (requestId) => {
    const res = await axiosInstance.patch(API_ROUTES.COLLAB.ACCEPT(requestId));
    return res.data.data;
};

export const rejectCollabRequest = async (requestId) => {
    const res = await axiosInstance.patch(API_ROUTES.COLLAB.REJECT(requestId));
    return res.data.data;
};

export const withdrawCollabRequest = async (requestId) => {
    const res = await axiosInstance.delete(API_ROUTES.COLLAB.WITHDRAW(requestId));
    return res.data.data;
};

export const getCollaboratingPackages = async () => {
    const res = await axiosInstance.get(API_ROUTES.COLLAB.GET_COLLABORATING_PACKAGES());
    return res.data.data;
};