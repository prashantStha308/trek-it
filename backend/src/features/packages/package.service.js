import mongoose from "mongoose";
// Models
import {
    Package,
    CustomRequest,
    User,
} from "../../models/index.js";
// utils and helpers
import {getAll} from "../../utils/crud.service.js"
import {
    uploadImages
} from "../../utils/cloudinary.services.js";
import ApiError from "../../utils/ApiError.js";
import { TREKIT_COMMISSION } from "../../constants/booking.constant.js";
import { PACKAGE_TYPE_ENUM } from "../../constants/package.constant.js";
import {
    broadcastNotificationService
} from "../notifications/notifications.service.js";
import { CUSTOM_STATES } from "../../models/requests/customRequest.model.js";

// --------------------------------------------------------------------------------

export const createPackageService = async (body, guideId, files) => {
    let images = [];
    let thumbnail = "";

    if (files?.length) {
        images = await uploadImages(files);
        thumbnail = images[0]?.src ?? "";
    }

    const newPackage = await Package.create({
        name: body.name,
        description: body.description,
        guide: guideId,
        keywords: body.keywords,
        regions: body.regions,
        activities: body.activities,
        type: body.type || PACKAGE_TYPE_ENUM.regular,
        startingPrice: body.startingPrice,
        pricePerPerson: body.pricePerPerson,
        maxGroupSize: body.maxGroupSize,
        daysAlloted: body.daysAlloted,
        images,
        thumbnail,
        requiresPermit: body.requiresPermit,
        verified: false
    });

    return newPackage;
};

export const createCustomPackageService = async (guide, body, files) => {
    const customRequestId = body.customRequest;
    const directTouristId = body.tourist;

    let touristId = directTouristId;
    let customRequest = null;

    if (customRequestId) {
        customRequest = await CustomRequest.findById(customRequestId);
        if (!customRequest) throw new ApiError(404, "Custom request not found");
        if (customRequest.guide.toString() !== guide._id.toString()) {
            throw new ApiError(403, "Unauthorized. This custom request does not belong to the current guide.");
        }
        if ([CUSTOM_STATES.rejected, CUSTOM_STATES.expired].includes(customRequest.status)) {
            throw new ApiError(400, `Cannot create a package from a ${customRequest.status} request`);
        }
        touristId = customRequest.tourist;

        if (customRequest.status !== CUSTOM_STATES.accepted) {
            customRequest.status = CUSTOM_STATES.accepted;
            await customRequest.save();
        }
    }

    if (!touristId) {
        throw new ApiError(400, "Tourist id is required when customRequest is not provided");
    }

    const tourist = await User.findById(touristId).select('_id name profilePicture');
    if (!tourist) throw new ApiError(404, "Tourist not found");

    let images = [];
    let thumbnail = "";

    if (files?.length) {
        images = await uploadImages(files);
        thumbnail = images[0]?.src ?? "";
    }

    const newPackage = await Package.create({
        name: body.name,
        description: body.description,
        guide: guide._id,
        tourist: tourist._id,
        customRequest: customRequest?._id ?? null,
        keywords: body.keywords,
        regions: body.regions,
        activities: body.activities,
        type: PACKAGE_TYPE_ENUM.custom,
        startingPrice: body.startingPrice,
        pricePerPerson: body.pricePerPerson,
        maxGroupSize: body.maxGroupSize,
        daysAlloted: body.daysAlloted,
        images,
        thumbnail,
        requiresPermit: body.requiresPermit,
        verified: false
    });

    const recipients = [guide._id, tourist._id];
    await broadcastNotificationService("notification:customPackageCreated", recipients, {
        title: "Custom package prepared",
        message: `A custom package has been created by ${guide.name || 'your guide'}. Please review the package details before confirming booking.`,
        meta: {
            packageId: newPackage._id,
            guideId: guide._id,
            touristId: tourist._id,
            customRequestId: customRequest?._id ?? null
        }
    });

    return newPackage;
};


export const searchPackageService = async(query)=>{

    const { limit, page, name, sort, ...filters } = query;
    const filter = {};

    if (name) {
        filter.$or = [
            { name: { $regex: name, $options: "i" } },
            { description: { $regex: name, $options: "i" } }
        ];
    }

    Object.keys(filters).forEach((key) => {
        const value = filters[key];
        filter[key] = { $in: Array.isArray(value) ? value : [value] };
    });


    if (!name && Object.keys(filters).length === 0) {
        throw new ApiError(400, "At least one search parameter is required");
    }

    return await getAll(Package, {
        limit,
        page,
        filter,
        sort: { rating: -1 },
        populate: [
            { path: "guide", select: "_id name profilePicture languages specialities regions gender age location" }
        ]
    });
}

export const updatePackageService = async (guideId, packageId, body, files) => {
    const targetPackage = await Package.findById(packageId);

    if (!targetPackage) throw new ApiError(404, "Package not found");

    if (targetPackage.guide !== guideId) {
        throw new ApiError(403, "Unauthorized");
    }

    if (files?.length) {
        const uploaded = await uploadImages(files);
        body.images = uploaded;
        body.thumbnail = uploaded[0]?.src ?? targetPackage.thumbnail;
    }

    Object.assign(targetPackage, body);
    await targetPackage.save();

    return targetPackage;
};


export const deletePackageService = async (packageId) => {
    const targetPackage = await Package.findByIdAndDelete(packageId);

    if (!targetPackage) {
        throw new ApiError(404, "Package not found");
    }

    // TODO: Cascading deletes (bookings, reviews tied to this package)
    // should be handled by Mongoose post('findOneAndDelete') middleware
};


// Bookings related

export const getNextNDates = (startDate, n) => {
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

/**
 * @description - Returns totalPrice
 * 
 * @param {mongoose.Model('Package')} pkg - targetPackage 
 * @param {Number} groupSize - Number of person in booking
 * @returns {Number} - Total cost, including TREKIT_COMMISSION 
 */
export const getTotalPrice = (pkg, groupSize) => {
    const perPersonCost = pkg.pricePerPerson * groupSize;
    const baseCost = Math.max(perPersonCost, pkg.startingPrice);
    const totalCost = baseCost + baseCost * TREKIT_COMMISSION;
    return totalCost;
}