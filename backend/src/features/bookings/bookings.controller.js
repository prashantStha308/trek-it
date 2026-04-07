import { Booking } from "../../models/index.js";

import ApiResponse from "../../utils/ApiResponse.js";
import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import { setBookingStatusService } from "./bookings.service.js";

export const createBooking = async (req, res) => {

}

export const getAllBooking = async (req, res) => {
    const loggedInUser = req.user;
    const { limit, page, ...filter } = req.query;
    
    const bookings = await getAll(Booking, {
        limit, page,
        filter: {
            ...filter,
            $or: [
                { guide: loggedInUser._id },
                { tourist: loggedInUser._id }
            ],
        },
        sort: {
            createdAt: -1
        }
    });

    return ApiResponse.success(res, {
        data: bookings,
        message: "Retrived all the bookings"
    })
}

export const getBookingById = async (req, res) => {
    const loggedInUser = req.user;
    
    const booking = await getById(Booking, req.params.bookingId, {
        filter: {
            $or: [
                { guide: loggedInUser._id },
                { tourist: loggedInUser._id }
            ]
        }
    });

    return ApiResponse.success(res, {
        data: booking,
        message: "Booking found"
    });
}

export const setBookingStatus = async (req, res) => {
    const booking = await setBookingStatusService(req.params.bookingId, req.body.status);

    return ApiResponse.success(res, {
        data: booking,
        message: "Status updated"
    });
}

export const cancleBooking = async (req, res) => {
    
}

// Booking shouldn't be edited
// export const updateBooking = async (req, res) => {}

// NEVER DELETE BOOKING