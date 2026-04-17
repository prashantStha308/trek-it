import { Booking } from "../../models/index.js";

import ApiResponse from "../../utils/ApiResponse.js";
import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import {
    createBookingService,
    deleteBookingService,
    setBookingStatusService,
    cancleBookingService,
} from "./bookings.service.js";



export const createBooking = async (req, res) => {
    // this function is executed in tourist's side
    const booking = await createBookingService(req.user, req.body, { guideId: req.body.guideId });
    
    return ApiResponse.success(res, {
        data: booking,
        message: "Booking created successfully",
        status: 201
    })
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
        data: booking._id,
        message: `Status of booking id: ${booking._id} was updated to ${bookingStatus}`
    });
}

export const cancelBooking = async (req, res) => {
    const booking = await cancleBookingService(req.params.bookingId, req.user);

    return ApiResponse.success(res, {
        message: `Booking: ${booking.name} has been cancelled`,
        data: booking._id
    });
}

// Booking shouldn't be edited
// export const updateBooking = async (req, res) => {}

export const deleteBooking = async (req, res) => {
    // Only allowed to Admins

    const bookingId = await deleteBookingService(req.params.bookingId);

    return ApiResponse.success(res, {
        data: bookingId,
        message: `Booking id: ${bookingId} has been deleted`
    })
}