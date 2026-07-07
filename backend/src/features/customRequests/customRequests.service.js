import { CustomRequest, Package, Booking } from "../../models/index.js";
import { CUSTOM_STATES } from "../../models/requests/customRequest.model.js";
import { BOOKING_STATUS_ENUM, NOTIFICATION_TITLE } from "../../constants/constants.js";
import ApiError from "../../utils/ApiError.js";
import { getAll } from "../../utils/crud.service.js";
import { sendNotificationService } from "../notifications/notifications.service.js";
import { getTotalPrice, getNextNDates } from "../packages/package.service.js";
import { assignGuide } from "../guides/guides.service.js";

// -----------------------------------------------------------------------------------------

/**
 * Tourist sends a customization request to the package's guide.
 */
export const createCustomRequestService = async (tourist, body) => {
    const { packageId, groupSize, description } = body;

    const targetPackage = await Package.findById(packageId).populate({
        path: "guide",
        select: "_id name profilePicture",
    });

    if (!targetPackage) throw new ApiError(404, "Package not found");

    // Validate groupSize against package constraints
    if (groupSize < targetPackage.minGroupSize || groupSize > targetPackage.maxGroupSize) {
        throw new ApiError(
            400,
            `Group size must be between ${targetPackage.minGroupSize} and ${targetPackage.maxGroupSize}`
        );
    }

    // A tourist can only have one pending custom request per package guide
    const existing = await CustomRequest.exists({
        tourist: tourist._id,
        guide: targetPackage.guide._id,
        status: CUSTOM_STATES.pending,
    });
    if (existing) throw new ApiError(400, "You already have a pending custom request for this package");

    const totalPrice = getTotalPrice(targetPackage, groupSize);

    const requestDescription = description?.trim()
        || `Tourist requests "${targetPackage.name}" for a group of ${groupSize}. Quoted price: NRS ${totalPrice}.`;

    const request = await CustomRequest.create({
        tourist: tourist._id,
        guide: targetPackage.guide._id,
        description: requestDescription,
    });

    // Notify the guide
    await sendNotificationService("customRequestReceived", targetPackage.guide._id, {
        title: "New package customization request",
        message: `${tourist.name} wants to customize "${targetPackage.name}" for a group of ${groupSize}.`,
        link: `/dashboard`,
        actions: [
            { label: "View Request", href: `/dashboard` },
        ],
        meta: {
            requestId: request._id,
            packageId: targetPackage._id,
            packageName: targetPackage.name,
            packageThumbnail: targetPackage.thumbnail,
            tourist: {
                _id: tourist._id,
                name: tourist.name,
                profilePicture: tourist.profilePicture,
            },
            groupSize,
            totalPrice,
        },
        priority: 1,
    });

    return { request, totalPrice };
};


export const getMyCustomRequestsService = async (user, { limit, page } = {}) => {
    const filter = user.role === "guide"
        ? { guide: user._id }
        : { tourist: user._id };

    return await getAll(CustomRequest, {
        limit,
        page,
        filter,
        populate: [
            { path: "tourist", select: "_id name profilePicture role" },
            { path: "guide", select: "_id name profilePicture role" },
        ],
    });
};


export const acceptCustomRequestService = async (requestId, guide) => {
    const request = await CustomRequest.findOne({
        _id: requestId,
        guide: guide._id,
        status: CUSTOM_STATES.pending,
    })
        .populate({ path: "tourist", select: "_id name profilePicture role" })
        .populate({ path: "guide", select: "_id name profilePicture role" });

    if (!request) throw new ApiError(404, "Pending custom request not found");

    // Mark request accepted
    request.status = CUSTOM_STATES.accepted;
    await request.save();

    // Parse groupSize from description  e.g. "...for a group of 5. Quoted price..."
    const groupSizeMatch = request.description?.match(/group of (\d+)/);
    const groupSize = groupSizeMatch ? parseInt(groupSizeMatch[1], 10) : 1;

    // Find the package this guide owns that the tourist requested
    const targetPackage = await Package.findOne({ guide: guide._id }).select(
        "_id name thumbnail pricePerPerson daysAlloted minGroupSize maxGroupSize guide"
    );
    if (!targetPackage) throw new ApiError(404, "Guide has no package to book");

    // Use today as default date — tourist can adjust later
    const date = new Date();
    const pkgDates = getNextNDates(date.toISOString().split("T")[0], targetPackage.daysAlloted);

    const assignedGuide = await assignGuide(targetPackage, pkgDates, guide._id);

    const booking = await Booking.create({
        tourist: request.tourist._id,
        guide: assignedGuide._id,
        package: targetPackage._id,
        date,
        groupSize,
        customRequest: request._id,
        status: BOOKING_STATUS_ENUM.pending,
        totalPrice: getTotalPrice(targetPackage, groupSize),
        payment: null,
    });

    // Update guide's booked dates
    assignedGuide.daysBooked.push(...pkgDates);
    await assignedGuide.save();

    // Notify tourist — send them to chat and tell them booking was created
    await sendNotificationService("customRequestAccepted", request.tourist._id, {
        title: "Customization request accepted!",
        message: `Your customization request has been accepted by ${guide.name}. A booking has been created — head to chat to discuss the details.`,
        link: `/chat`,
        actions: [
            { label: "Open Chat", href: `/chat` },
            { label: "View Booking", href: `/booking/${booking._id}` },
        ],
        meta: {
            requestId: request._id,
            bookingId: booking._id,
            guideId: guide._id,
            guideName: guide.name,
        },
        priority: 1,
    });

    // Return populated tourist so guide's client can openDirectChat
    return { request, booking, tourist: request.tourist };
};


export const rejectCustomRequestService = async (requestId, guide) => {
    const request = await CustomRequest.findOne({
        _id: requestId,
        guide: guide._id,
        status: CUSTOM_STATES.pending,
    }).populate({ path: "tourist", select: "_id name profilePicture" });

    if (!request) throw new ApiError(404, "Pending custom request not found");

    // Notify tourist before deleting
    await sendNotificationService("customRequestRejected", request.tourist._id, {
        title: "Customization request declined",
        message: `Your customization request has been declined by ${guide.name}.`,
        link: `/explore`,
        actions: [
            { label: "Explore Packages", href: `/explore` },
        ],
        meta: {
            requestId: request._id,
            guideId: guide._id,
            guideName: guide.name,
        },
        priority: 0,
    });

    // Delete so it disappears from both guide and tourist lists
    await request.deleteOne();

    return request;
};


export const withdrawCustomRequestService = async (requestId, tourist) => {
    const request = await CustomRequest.findOne({
        _id: requestId,
        tourist: tourist._id,
        status: CUSTOM_STATES.pending,
    });

    if (!request) throw new ApiError(404, "Pending custom request not found");

    await request.deleteOne();
    return request;
};
