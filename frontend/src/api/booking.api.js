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

export const getBookingById = async(id) => {
    const res = await axiosInstance.get(API_ROUTES.BOOKING.GET(id));

    return res.data.data;
}


export const getActiveBookings = async(query) => {
    const res = await axiosInstance.get(API_ROUTES.BOOKING.GET_ACTIVE(query));

    return res.data.data;
}

export const cancleBooking = async(id)=>{
    const res = await axiosInstance.patch(API_ROUTES.BOOKING.CANCEL(id));
    return res.data.data;
}

export const updateBookingStatus = async (id, status) => {
    const res = await axiosInstance.patch(API_ROUTES.BOOKING.UPDATE_STATUS(id), {status} );
    return res.data.data;
}