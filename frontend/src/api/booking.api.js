import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const createBooking = async (data) => {
    const res = await axiosInstance.post(API_ROUTES.BOOKING.CREATE, data);
    return res?.data?.data;
};
