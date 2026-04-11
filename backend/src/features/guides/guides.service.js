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
            .populate("review");

        if (!guide) {
            throw new ApiError(404, "Guide not found");
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
