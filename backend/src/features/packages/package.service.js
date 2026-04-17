import mongoose from "mongoose";
// Models
import {
    Package,
} from "../../models/index.js";
// utils and helpers
import { } from "../../utils/request.helper.js";
import {
    uploadImages
} from "../../utils/cloudinary.services.js";
import ApiError from "../../utils/ApiError.js";
import { TREKIT_COMMISSION } from "../../constants/booking.constant.js";
import { PACKAGE_TYPE_ENUM } from "../../constants/package.constant.js";

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