import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const createBooking = async (data) => {
    const res = await axiosInstance.post(API_ROUTES.BOOKING.CREATE, data);
    return res?.data?.data;
};


export const getUserBookings = async(query) => {
    const res = await axiosInstance.get(API_ROUTES.BOOKING.GET_ALL(query));

    return res.data.data;
}

export const getActiveBookings = async(query) => {
    const res = await axiosInstance.get(API_ROUTES.BOOKING.GET_ACTIVE(query));

    return res.data.data;
}