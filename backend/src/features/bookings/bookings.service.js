import mongoose from "mongoose";
import { Booking, Package, Guide } from "../../models/index.js";
import {
    BOOKING_STATUS_ENUM,
} from '../../constants/constants.js';
import {
    getNextNDates,
    getTotalPrice,
} from "../packages/package.service.js";
import {
    assignGuide
} from "../guides/guides.service.js";

import ApiError from "../../utils/ApiError.js";


export const createBookingService = async (touristId, body, { guideId } = {}) => {
    const { packageId, date, groupSize, customRequest = null } = body;

    const targetPackage = await Package.findById(packageId);
    if (!targetPackage) throw new ApiError(404, "Package not found");

    const pkgDates = getNextNDates(date, targetPackage.daysAlloted);

    const targetGuide = await assignGuide(targetPackage, pkgDates, guideId);

    const booking = await Booking.create({
        tourist: touristId,
        guide: targetGuide._id,
        package: packageId,
        date,
        groupSize,
        customRequest,
        status: BOOKING_STATUS_ENUM.pending,
        totalPrice: getTotalPrice(targetPackage, groupSize),
        payment: null
    });

    targetPackage.bookingCount += 1;

    targetGuide.daysBooked.push(...pkgDates);

    await Promise.all([targetPackage.save(), targetGuide.save()]);
    return [booking, targetPackage, targetGuide];
}


export const setBookingStatusService = async (bookingId, status) => {
    // only responsible for updating status of the booking. NOTHING ELSE

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");

    booking.status = status;
    await booking.save();

    return booking;
}


export const deleteBooking = async (bookingId) => {
    const booking = await Booking.findByIdAndDelete(bookingId);

    return booking._id;
}