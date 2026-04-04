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

// --------------------------------------------------------------------------------

export const createPackageService = async (body, guideId, files) => {
    let images = [];
    let thumbnail = "";

    if (files?.length) {
        images = await uploadImages(files);
        thumbnail = images[0]?.src ?? "";
    }

    // Avoid user from setting verified status manually
    if (body.verified) {
        delete body.verified;
    }

    const newPackage = await Package.create({
        ...body,
        guide: guideId,
        images,
        thumbnail,
    });

    return newPackage;
};


export const updatePackageService = async (packageId, body, files) => {
    const targetPackage = await Package.findById(packageId);

    if (!targetPackage) throw new ApiError(404, "Package not found");

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