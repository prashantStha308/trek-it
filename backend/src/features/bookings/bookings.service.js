import mongoose from "mongoose";
import { Booking, Package, Guide } from "../../models/index.js";

import {
    BOOKING_STATUS_ENUM,
} from '../../constants/constants.js';
import { ROLE_ENUM } from "../../constants/constants.js";
import {NOTIFICATION_TITLE, NOTIFICATION_EVENTS} from "../../constants/constants.js"

import {
    getNextNDates,
    getTotalPrice,
} from "../packages/package.service.js";
import {
    assignGuide
} from "../guides/guides.service.js";
import {
    sendNotificationService,
    broadcastNotificationService
} from "../notifications/notifications.service.js";
import ApiError from "../../utils/ApiError.js";


export const createBookingService = async (tourist, body, { guideId } = {}) => {
    const { packageId, date, groupSize, customRequest = null } = body;

    const targetPackage = await Package.findById(packageId);
    if (!targetPackage) throw new ApiError(404, "Package not found");

    // check if user has booked any other package
    const existingBooking = await Booking.exists({
        tourist: tourist._id,
        status: { $nin: [BOOKING_STATUS_ENUM.expired, BOOKING_STATUS_ENUM.completed, BOOKING_STATUS_ENUM.cancelled] }
    });

    if (existingBooking) {
        throw new ApiError(400, "User already has an active booking");
    }

    const pkgDates = getNextNDates(date, targetPackage.daysAlloted);

    console.log("Result of pkgDates: ",pkgDates)

    const targetGuide = await assignGuide(targetPackage, pkgDates, guideId);

    const booking = await Booking.create({
        name: targetPackage.name,
        tourist: tourist._id,
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

    const meta = {
        booking: {
            _id: booking._id,
            name: booking.name,
            date: booking.date,
            type: booking.type,
            status: booking.status,
            totalPrice: booking.totalPrice
        },
        guide: {
            _id: targetGuide._id,
            name: targetGuide.name,
            profilePicture: targetGuide.profilePicture,
        },
        tourist: {
            _id: tourist._id,
            name: tourist.name,
            profilePicture: tourist.profilePicture
        },
        package: {
            _id: targetPackage._id,
            name: targetPackage.name,
            thumbnail: targetPackage.thumbnail
        }
    }

    const promises = [];

    promises.push(sendNotificationService(NOTIFICATION_EVENTS.bookingCreated, booking.tourist, {
        title: `Booking Created: ${booking.name}`,
        message: `Your booking for package: ${targetPackage.name} has been successfully booked. You have been assigned a guide: ${targetGuide.name}, id: ${targetGuide.id}`,
        meta,
        priority: 1

    }));

    promises.push(sendNotificationService(NOTIFICATION_EVENTS.newBookingRequest, booking.guide, {
        title: `A new booking request has been made.`,
        message: `A new booking for ${targetPackage.name} has been made by ${tourist.name}(id: ${tourist._id}) on ${Date.now()} `,
        meta,
        priority: 1
    }));

    await Promise.all(promises);
    return booking;
}


export const setBookingStatusService = async (bookingId, status) => {
    // only responsible for updating status of the booking. NOTHING ELSE

    const booking = await Booking.findById(bookingId);
    if (!booking) throw new ApiError(404, "Booking not found");

    booking.status = status;
    await booking.save();

    const bookingStatus = booking.status;

    const event = NOTIFICATION_EVENTS[`booking${bookingStatus.charAt(0).toUpperCase() + bookingStatus.slice(1)}`]

    if(!NOTIFICATION_TITLE.includes(event)){
        throw new ApiError(500, "Invalid event encountered");
    }
    
    await broadcastNotificationService(event, [booking.tourist, booking.guide], {
        title: `Booking ${bookingStatus}`,
        message: `Booking for package: ${booking.package} has moved to ${bookingStatus} stage.`,
        priority: 1,
        meta: {
            bookingId: booking._id,
            packageId: booking.package,
            touristId: booking.tourist,
            guideId: booking.guide,
            status: bookingStatus
        }
    });

    return booking;
}


export const cancleBookingService = async (bookingId, user) => {

    const booking = await Booking.findOne({
        _id: bookingId,
        $or: [
            { guide: user._id },
            { tourist: user._id }
        ],
        status: {$nin: [BOOKING_STATUS_ENUM.cancelled, BOOKING_STATUS_ENUM.completed]}
    }).populate({
        path: "package",
        select: "_id name thumbnail startingPrice pricePerPerson daysAlloted"
    });

    if (!booking) throw new ApiError(404, "Booking associated with provided Ids was not found");

    const assignGuide = await Guide.findById(booking.guide);

    // remove booked dates from guide
    const bookedDates = getNextNDates(
        booking.date,
        booking.package.daysAlloted
    );

    assignGuide.daysBooked = assignGuide.daysBooked.filter(
        bookedDay => !bookedDates.some(
            targetDay => new Date(targetDay).getTime() === new Date(bookedDay).getTime()
        )
    );

    await assignGuide.save();


    // handle payment refund/punish
    switch (user.role) {
        case ROLE_ENUM.guide:
            // guide logic
            break;
        case ROLE_ENUM.tourist:
            // tourist logic
            break;
        case ROLE_ENUM.admin:
            // handle admin logic
            // will admin even need to cancle it?
            break;
        default:
            throw new ApiError(403, "Unidentified user role. Cancellation process terminated");
    }

    booking.status = BOOKING_STATUS_ENUM.cancelled;
    await booking.save();

    // set notification
    await broadcastNotificationService(NOTIFICATION_EVENTS.bookingCancelled, [booking.tourist, booking.guide], {
        title: `Booking Cancelled - ${booking.name}`,
        message: `Booking for ${booking.package.name} has been cancelled on by ${user.role} : ${user.name}, ${user._id}`,
        priority: 1,
        meta: {
            booking: {
                _id: booking._id,
                name: booking.name,
                date: booking.date,
                type: booking.type,
                status: booking.status,
                totalPrice: booking.totalPrice
            },
            package: {
                _id: booking.package._id,
                name: booking.package.name,
                thumbnail: booking.package.thumbnail,
                startingPrice: booking.package.startingPrice,
                pricePerPerson: booking.package.pricePerPerson
            },
            initializer: {
                _id: user._id,
                name: user.name,
                role: user.role,
                profilePicture: user.profilePicture,
            },
            cancellationDate: Date.now()
        }
    });

    return booking;
}

/**
 * @description - This is a dangerous action, and is to used only by admin at critical conditions
 * 
 * @param {String} bookingId - ID of the booking to be deleted 
 * @returns 
 */
export const deleteBookingService = async (bookingId) => {
    // only available to admin
    const booking = await Booking.findByIdAndDelete(bookingId);

    return booking._id;
}