import mongoose from "mongoose";
// Models
import { Guide } from "../../models/index.js";
// Utilities
import ApiError from "../../utils/ApiError.js";
import { getAll, getById } from "../../utils/crud.service.js";
import {
    updateProfilePicture,
} from "../../utils/request.helper.js";
import { deleteImage } from "../../utils/cloudinary.services.js"

// ============================================================================================
// GET ALL GUIDES - with filters and pagination
export const getAllGuidesService = async (filters = {}, limit = 10, page = 1) => {
    try {
        const filterObject = {
            ...filters,
            role: "guide"
        };

        const guides = await getAll(Guide, {
            limit,
            page,
            filter: filterObject,
            select: "-password",
            populate: [
                { path: "collaborations", select: "name description" },
                { path: "review" }
            ],
            sort: { rating: -1 }
        });

        return guides;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// GET GUIDE BY ID
export const getGuideByIdService = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new ApiError(400, "Invalid guide ID");
        }

        const guide = await getById(Guide, id, {
            select: "-password",
            populate: [
                { path: "collaborations", select: "name description price regions" },
                { path: "review" }
            ]
        });

        if (!guide) {
            throw new ApiError(404, "Guide not found");
        }

        return guide;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// GET VERIFIED GUIDES ONLY
export const getVerifiedGuidesService = async (limit = 10, page = 1) => {
    try {
        const guides = await getAll(Guide, {
            limit,
            page,
            filter: { isVerified: true, role: "guide" },
            select: "-password",
            populate: [
                { path: "collaborations", select: "name description" },
                { path: "review" }
            ],
            sort: { rating: -1 }
        });

        return guides;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// GET GUIDES BY REGION
export const getGuidesByRegionService = async (region, limit = 10, page = 1) => {
    try {
        if (!region) {
            throw new ApiError(400, "Region is required");
        }

        const guides = await getAll(Guide, {
            limit,
            page,
            filter: {
                regions: { $in: [region] },
                role: "guide",
                isVerified: true
            },
            select: "-password",
            populate: [
                { path: "collaborations", select: "name description" },
                { path: "review" }
            ],
            sort: { rating: -1 }
        });

        return guides;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// GET GUIDES BY SPECIALITY
export const getGuidesBySpecialityService = async (speciality, limit = 10, page = 1) => {
    try {
        if (!speciality) {
            throw new ApiError(400, "Speciality is required");
        }

        const guides = await getAll(Guide, {
            limit,
            page,
            filter: {
                specialities: { $in: [speciality] },
                role: "guide",
                isVerified: true
            },
            select: "-password",
            populate: [
                { path: "collaborations", select: "name description" },
                { path: "review" }
            ],
            sort: { rating: -1 }
        });

        return guides;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// VERIFY GUIDE (Admin only)
export const verifyGuideService = async (guideId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            throw new ApiError(400, "Invalid guide ID");
        }

        const guide = await Guide.findById(guideId);

        if (!guide) {
            throw new ApiError(404, "Guide not found");
        }

        if (guide.isVerified) {
            throw new ApiError(400, "Guide is already verified");
        }

        guide.isVerified = true;
        await guide.save();

        return guide;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// REJECT GUIDE VERIFICATION (Admin only)
export const rejectGuideService = async (guideId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            throw new ApiError(400, "Invalid guide ID");
        }

        const guide = await Guide.findById(guideId);

        if (!guide) {
            throw new ApiError(404, "Guide not found");
        }

        if (!guide.isVerified) {
            throw new ApiError(400, "Guide is not verified yet");
        }

        guide.isVerified = false;
        await guide.save();

        return guide;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// UPDATE GUIDE PROFILE
export const updateGuideProfileService = async (guideId, body, file) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            throw new ApiError(400, "Invalid guide ID");
        }

        const guide = await Guide.findById(guideId);

        if (!guide) {
            throw new ApiError(404, "Guide not found");
        }

        // Prevent role change
        if (body.role) {
            throw new ApiError(400, "User role cannot be changed");
        }

        // Prevent verification status change through this endpoint
        if (body.isVerified !== undefined) {
            throw new ApiError(400, "Verification status cannot be changed here");
        }

        // Update allowed fields
        const allowedFields = ["name", "email", "age", "gender", "location", "regions", "specialities"];
        Object.keys(body).forEach(key => {
            if (allowedFields.includes(key)) {
                guide[key] = body[key];
            }
        });

        // Handle profile picture update
        if (file) {
            const res = await updateProfilePicture(guide.profilePicture?.publicId, file);
            guide.profilePicture = {
                src: res.secure_url,
                publicId: res.public_id
            };
        }

        await guide.save();
        return guide;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// GET GUIDE STATISTICS
export const getGuideStatsService = async (guideId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            throw new ApiError(400, "Invalid guide ID");
        }

        const guide = await Guide.findById(guideId)
            .populate("collaborations")
            .lean();

        if (!guide) {
            throw new ApiError(404, "Guide not found")
        }

        const stats = {
            totalPackages: guide.packageCount,
            totalCollaborations: guide.collaborations?.length || 0,
            totalReviews: guide.review?.length || 0,
            rating: guide.rating,
            isVerified: guide.isVerified,
            regions: guide.regions,
            specialities: guide.specialities
        };

        return stats;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// DELETE GUIDE (Admin only)
export const deleteGuideService = async (guideId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(guideId)) {
            throw new ApiError(400, "Invalid guide ID");
        }

        const guide = await Guide.findByIdAndDelete(guideId);

        if (!guide) {
            throw new ApiError(404, "Guide not found");
        }

        // Delete profile picture from Cloudinary
        if (guide.profilePicture?.publicId) {
            await deleteImage(guide.profilePicture.publicId);
        }

        return guide;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// SEARCH GUIDES
export const searchGuidesService = async (query, limit = 10, page = 1) => {
    try {
        if (!query || query.trim() === "") {
            throw new ApiError(400, "Search query is required");
        }

        const guides = await getAll(Guide, {
            limit,
            page,
            filter: {
                role: "guide",
                isVerified: true,
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialities: { $in: [new RegExp(query, "i")] } },
                    { regions: { $in: [new RegExp(query, "i")] } }
                ]
            },
            select: "-password",
            populate: [
                { path: "collaborations", select: "name description" },
                { path: "review" }
            ]
        });

        return guides;
    } catch (err) {
        throw err;
    }
};

// ============================================================================================
// GET UNVERIFIED GUIDES (Admin only)
export const getUnverifiedGuidesService = async (limit = 10, page = 1) => {
    try {
        const guides = await getAll(Guide, {
            limit,
            page,
            filter: { isVerified: false, role: "guide" },
            select: "-password",
            sort: { createdAt: -1 }
        });

        return guides;
    } catch (err) {
        throw err;
    }
};

export const toggleGuideAvailabilityService = async (guideId) => {
    const targetGuide = await Guide.findById(guideId);
    if (!targetGuide) throw new ApiError(404, "Guide not found");

    targetGuide.isAvailable = !targetGuide.isAvailable;
    await targetGuide.save();

    return targetGuide;
}

// Booking related
const checkOverlappingDays = (targetGuide, pkgDates) => {
    const bookedSet = new Set(
        targetGuide.daysBooked.map(d => new Date(d).toISOString())
    );

    return pkgDates.some(date => bookedSet.has(new Date(date).toISOString()));
}

const selectCollaborator = async (availableGuides = [], pkg) => {
    if (availableGuides.length === 0) return null;
    if (availableGuides.length === 1) return availableGuides[0];

    // use round robin algo for selection
    const preSortedGuides = await Promise.all(
        availableGuides.map(async (guide) => ({
            guide,
            count: await Booking.countDocuments({
                guide: guide._id,
                status: { $in: [BOOKING_STATUS_ENUM.accepted, BOOKING_STATUS_ENUM.completed] },
                package: pkg._id
            })
        }))
    );

    const sortedGuides = preSortedGuides.sort((a, b) => a.count - b.count);
    return sortedGuides[0].guide;
}

/**
 * @description - Returns a guides to be assigned
 * 
 * @param {mongoose.Model('Package')} targetPackage - Package Object 
 * @param {String[]} pkgDates - Array of alloted days in package
 * @param {String} guideId - ObjectId String of selected guide (optional) 
 * @returns {Promise< {mongoose.Model('Package')} >} - Returns guide to assign
 * 
 * @throws {ApiError} - 404, "Selected guide not found"
 * @throws {ApiError} - 503, "Selected guide not available"
 * @throws {ApiError} - 503, "No guides available"
 */
export const assignGuide = async (targetPackage, pkgDates, guideId) => {

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
    const assigned = await selectCollaborator(availableGuides, targetPackage);
    if (!assigned) throw new ApiError(503, "No guides currently available");

    return assigned;
}