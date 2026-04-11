import { Booking } from "../../models/index.js";

import ApiResponse from "../../utils/ApiResponse.js";
import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import {
    sendNotificationService,
    broadcastNotificationService
} from "../notifications/notifications.service.js";
import { createBookingService, setBookingStatusService } from "./bookings.service.js";

export const createBooking = async (req, res) => {
    // this function is executed in user side
    const [booking, targetPackage, targetGuide] = await createBookingService(req.user._id, req.body, { guideId: req.body.guideId });
    
    await broadcastNotificationService("bookingCreated", [req.user._id, targetGuide._id], {
        title: "Booking Created",
        message: `Your booking for package: ${targetPackage.name} has been successfully booked. Connect with your guide: ${targetGuide.name} in chat.`,
        meta: {
            booking: booking._id,
            guide: {
                _id: targetGuide._id,
                name: targetGuide.name,
                profilePicture: targetGuide.profilePicture,
            },
            package: {
                _id: targetPackage._id,
                name: targetPackage.name,
                thumbnail: targetPackage.thumbnail
            }
        }
    });

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
    const bookingStatus = req.body.status;
    const booking = await setBookingStatusService(req.params.bookingId, bookingStatus);
    const bookingParties = [booking.tourist, booking.guide]

    // booking + Capilaize the first letter of the status
    const event = "booking"+bookingStatus.charAt(0).toUpperCase() + bookingStatus.slice(1)

    await broadcastNotificationService(event, bookingParties, {
        title: `Booking ${bookingStatus}`,
        message: `Your booking for package: ${booking.package} has moved to ${bookingStatus} stage.`,
        meta: {
            bookingId: booking._id,
            packageId: booking.package,
            touristId: bookingParties[0],
            guideId: bookingParties[1],
            status: bookingStatus
        }
    });

    return ApiResponse.success(res, {
        data: booking,
        message: `Status of booking id: ${booking._id} was updated to ${bookingStatus}`
    });
}

export const cancelBooking = async (req, res) => {
    req.body.status = "cancelled";

    return await setBookingStatus(req, res);
}

// Booking shouldn't be edited
// export const updateBooking = async (req, res) => {}

export const deleteBooking = async (req, res) => {
    // Only allowed to Admins

    const booking = await Booking.findByIdAndDelete(req.params.bookingId);

    return ApiResponse.success(res, {
        data: booking._id,
        message: `Booking id: ${booking._id} has been deleted`
    })
}