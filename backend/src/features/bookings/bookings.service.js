import mongoose from "mongoose";
import { Booking } from "../../models/index.js";
import {
    BOOKING_STATUS_ENUM,
    ROLE_ENUM,
} from "../../middlewares/validation/constants.validation.js";
import ApiError from "../../utils/ApiError.js";

export const createBookingService = async (guide, tourist, body) => {
    // need to rethink the args
}

export const setBookingStatusService = async (bookingId, status) => {
    // only responsible for updating status of the booking. NOTHING ELSE

    /*
        What should be validated before updating status?
        ....
        1. Make sure status has correct value(validated by middleware)
    */
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");

    booking.status = status;
    await booking.save();

    return booking;
}

export const cancleBookingService = async (bookingId) => {
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");

    // maybe we'll need some business logic later on. Not sure though

    booking.status = BOOKING_STATUS_ENUM.cancelled;
    booking.save();

    return booking;
}

export const deleteBooking = async (bookingId) => {
    /*
    ONLY DELETE IF USER IS ADMIN
    */
    
    const user = req.user;

    if (user.role !== ROLE_ENUM.admin) {
        throw new ApiError(403, "Forbidden");
    }

    const booking = await Booking.findByIdAndDelete(bookingId);
}