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
import {BOOKING_STATUS_ENUM} from "../../constants/constants.js";


const USER_SELECT = "_id name profilePicture age gender address"

// Create a booking. Executed from tourist side only
export const createBooking = async (req, res) => {
    const booking = await createBookingService(req.user, req.body, { guideId: req.body.guideId });
    
    return ApiResponse.success(res, {
        data: booking,
        message: "Booking created successfully",
        status: 201
    })
}

// Get all bookings
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
        },
        populate: [
            {path: "tourist", USER_SELECT},
            {path: "guide", USER_SELECT},
            {path: "package", select: "_id name thumbnail guide daysAlloted maxGroupSize verified requiresPermit regions keywords activities" }
        ]
    });

    return ApiResponse.success(res, {
        data: bookings,
        message: "Retrived all the bookings"
    })
}

export const getActiveBookings = async (req, res) => {
    req.query.filter = {
        ...filter,
        status: {
            $nin: [BOOKING_STATUS_ENUM.completed, BOOKING_STATUS_ENUM.expired, BOOKING_STATUS_ENUM.cancelled]
        }
    }

    await getAllBooking(req, res)
}

export const getBookingById = async (req, res) => {
    const loggedInUser = req.user;
    
    const booking = await getById(Booking, req.params.bookingId, {
        filter: {
            $or: [
                { guide: loggedInUser._id },
                { tourist: loggedInUser._id }
            ]
        },
        populate: [
            {path: "tourist", USER_SELECT},
            {path: "guide", USER_SELECT},
            {path: "package", select: "_id name guide thumbnail daysAlloted maxGroupSize pricePerPerson verified requiresPermit regions keywords activities" }
        ]

    });

    return ApiResponse.success(res, {
        data: booking,
        message: "Booking found"
    });
}

export const setBookingStatus = async (req, res) => {
    const booking = await setBookingStatusService(req.params.bookingId, req.body.status, req.user);

    return ApiResponse.success(res, {
        data: booking._id,
        message: `Status of booking id: ${booking._id} was updated to ${req.body.status}`
    });
}

export const cancelBooking = async (req, res) => {
console.log("cacleing")

    
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