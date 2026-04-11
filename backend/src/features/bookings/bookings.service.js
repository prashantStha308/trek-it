import mongoose from "mongoose";
import { Booking, Package, Guide } from "../../models/index.js";
import {
    BOOKING_STATUS_ENUM,
    ROLE_ENUM,
} from '../../constants/constants.js';
import { sendNotificationService } from "../notifications/notifications.service.js";

import ApiError from "../../utils/ApiError.js";



// Keep these func in other files
const getValidatedDateIndex = (date, targetPackage) => {
    const normalizedDate = new Date(date).toISOString();

    const targetDateIndex = targetPackage.dates.findIndex(d => 
        new Date(d.date).toISOString() === normalizedDate
    );

    if (targetDateIndex === -1) throw new ApiError(404, "Date not available for this package");

    return targetDateIndex;
}

const validatePackageDate = (date, groupSize, targetPackage) => {
    const targetDateIndex = getValidatedDateIndex(date, targetPackage);
    const packageDate = targetPackage.dates[targetDateIndex];

    if (!packageDate.isOpen) throw new ApiError(400, "This date is closed for booking");
    if (packageDate.spotsLeft < groupSize) throw new ApiError(400, "Not enough spots available");

    return targetDateIndex;
}

const getNextNDates = (startDate, n) => {
    const dates = [];
    const start = new Date(startDate);

    for (let i = 0; i < n; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        d.setHours(0, 0, 0, 0);
        dates.push(d);
    }

    return dates;
}

const checkOverlappingDays = (targetGuide, pkgDates) => {
    const bookedSet = new Set(
        targetGuide.daysBooked.map(d => new Date(d).toISOString())
    );

    return pkgDates.some(date => bookedSet.has(new Date(date).toISOString()));
}

const selectCollaborator = async (availableGuides = []) => {
    if (availableGuides.length === 0) return null;
    if (availableGuides.length === 1) return availableGuides[0];

    // use round robin algo for selection
    const preSortedGuides = await Promise.all(
        availableGuides.map(async (guide) => ({
            guide,
            count: await Booking.countDocuments({
                guide: guide._id,
                status: { $in: [BOOKING_STATUS_ENUM.pending, BOOKING_STATUS_ENUM.confirmed, BOOKING_STATUS_ENUM.completed] }
            })
        }))
    );

    const sortedGuides = preSortedGuides.sort((a, b) => a.count - b.count);
    return sortedGuides[0].guide;
}

/*
    Returns a guide to be assigned to the booking. If a guide has been selected, it's validated and only then assigned.
*/
const assignGuide = async (targetPackage, pkgDates, guideId) => {

    // Validate selected guide
    if (guideId) {
        const targetGuide = await Guide.findById(guideId);
        if (!targetGuide) throw new ApiError(404, "Selected guide not found");

        if (checkOverlappingDays(targetGuide, pkgDates)) {
            throw new ApiError(503, "Selected guide will be busy on targeted days");
        }
        return targetGuide;
    }

    const allGuides = [targetPackage.guide, ...targetPackage.collaborators];

    // Get all the available guides among the collaborators and main guide of package
    const availableGuides = await Guide.find({
        _id: { $in: allGuides },
        daysBooked: { $nin: pkgDates }
    });

    if (availableGuides.length === 0) throw new ApiError(503, "No guides currently available");

    // Check if main guide is among avilable. If yes, mainGuide is given the highest priority.
    const mainGuide = availableGuides.find(aGuide => 
        aGuide._id.toString() === targetPackage.guide.toString()
    )
    if (mainGuide) return mainGuide;

    // Select a guide from collaborators
    const assigned = await selectCollaborator(availableGuides);
    if (!assigned) throw new ApiError(503, "No guides currently available");

    return assigned;
}


// Main functions


export const createBookingService = async (touristId, body, { guideId } = {}) => {
    const { packageId, date, groupSize, customRequest = null } = body;

    const targetPackage = await Package.findById(packageId);
    if (!targetPackage) throw new ApiError(404, "Package not found");

    const targetDateIndex = validatePackageDate(date, groupSize, targetPackage);
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
        totalPrice: targetPackage.startingPrice * groupSize,
        payment: null
    });

    // update spots and guide's booked days
    targetPackage.dates[targetDateIndex].spotsLeft -= groupSize;
    if (targetPackage.dates[targetDateIndex].spotsLeft === 0) {
        targetPackage.dates[targetDateIndex].isOpen = false;
    }

    targetGuide.daysBooked.push(...pkgDates);

    await Promise.all([targetPackage.save(), targetGuide.save()]);
    // await sendNotificationService("bookingCreated", ); handle this in controller

    return [booking, targetPackage, targetGuide];
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

    if (user.role !== "admin") {
        throw new ApiError(403, "Forbidden");
    }

    const booking = await Booking.findByIdAndDelete(bookingId);

    return booking._id;
}