import mongoose from "mongoose";
// Models
import {
    Package,
    CustomRequest,
    User,
} from "../../models/index.js";

import { CUSTOM_STATES } from "../../models/requests/customRequest.model.js";
// utils and helpers
import {getAll} from "../../utils/crud.service.js"
import {
    uploadImages,
    uploadImage,
} from "../../utils/cloudinary.services.js";

// Constants
import ApiError from "../../utils/ApiError.js";
import { TREKIT_COMMISSION } from "../../constants/booking.constant.js";
import { PACKAGE_TYPE_ENUM } from "../../constants/package.constant.js";
import {NOTIFICATION_TITLE, NOTIFICATION_EVENTS} from "../../constants/constants.js"

import {
    sendNotificationService,
    broadcastNotificationService
} from "../notifications/notifications.service.js";



export const createPackageService = async (body, guide, files) => {
    let images = [{src:"", publicId: ""}];
    let thumbnail = images[0];

    if (files) {
        thumbnail = await uploadImage(files.thumbnail[0]);
        images = await uploadImages(files.images);
    }

    const regions = Array.from( new Set( body.stops.map(stop => stop.nearestCity?.name ?? stop.nearestCity )))

    const newPackage = await Package.create({
        name: body.name,
        description: body.description,
        guide: guide._id,

        keywords: body.keywords,
        activities: body.activities,
        regions,

        minGroupSize: Math.max(1, Number(body.minGroupSize)),
        maxGroupSize: Number(body.maxGroupSize),
        daysAlloted: Number(body.daysAlloted),

        pricePerPerson: Number(body.pricePerPerson),
        startingPrice: Number(body.minGroupSize) * Number(body.pricePerPerson),

        stops: body.stops,

        images,
        thumbnail,
        requiresPermit: body.requiresPermit || false,
        permitDetails: body.permitDetails || "",
        verified: false
    });


    await sendNotificationService( NOTIFICATION_TITLE.packageCreated,guide._id, {
        title: "Successfully created Packge",
        message: NOTIFICATION_EVENTS.packageCreated,
        actions:[
            {label: "View Package", href:`/explore/packages/${newPackage._id}`}
        ],
        meta:{
            guide: {
                _id: guide._id,
                name: guide.name,
                profilePicture: guide.profilePicture,
            },
            package: {
                _id: newPackage._id,
                name: newPackage.name,
                thumbnail: newPackage.thumbnail
            }
        }
    } );

    return newPackage;
};


export const searchPackageService = async(query)=>{

    const { limit, page, name, sort, ...filters } = query;
    const filter = {};

    if (name) {
        const regexOpt = {$regex: name, $options: "i"}

        filter.$or = [
            { name: regexOpt },
            { description: regexOpt },
            { keywords: regexOpt }
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


export const updatePackageService = async (guide, packageId, body, files) => {

    const targetPackage = await Package.findById(packageId);

    if (!targetPackage) throw new ApiError(404, "Package not found");

    if (targetPackage.guide.toString() !== guide._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    if (files?.length) {
        const uploaded = await uploadImages(files);
        body.images = uploaded;
        body.thumbnail = uploaded[0]?.src ?? targetPackage.thumbnail;
    }

    Object.assign(targetPackage, body);

    const promises = [];

    promises.push(targetPackage.save());
    promises.push(
        sendNotificationService( NOTIFICATION_TITLE.packageUpdated,guide._id, {
            title: "Successfully updated Packge",
            message: NOTIFICATION_EVENTS.packageUpdated,
            actions:[
                {label: "View Package", href:`/explore/packages/${targetPackage._id}`}
            ],
            meta:{
                guide: {
                    _id: guide._id,
                    name: guide.name,
                    profilePicture: guide.profilePicture,
                },
                package: {
                    _id: targetPackage._id,
                    name: targetPackage.name,
                    thumbnail: targetPackage.thumbnail
                }
            }
        } )
    );

    await Promise.all(promises);

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