import ApiResponse from "../../utils/ApiResponse.js";
import {
    getAllGuidesService,
    getGuideByIdService,
    getVerifiedGuidesService,
    getGuidesByRegionService,
    getGuidesBySpecialityService,

    verifyGuideService,
    rejectGuideService,
    
    updateGuideProfileService,
    getGuideStatsService,
    deleteGuideService,
    searchGuidesService,
    getUnverifiedGuidesService,
    toggleGuideAvailabilityService
} from "./guides.service.js";

// ============================================================================================
// GET ALL GUIDES - with optional filters
export const getAllGuides = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, region, speciality, verified } = req.query;

        let filters = {};
        if (region) filters.regions = { $in: [region] };
        if (speciality) filters.specialities = { $in: [speciality] };
        if (verified === "true") filters.isVerified = true;

        const guides = await getAllGuidesService(
            filters,
            parseInt(limit),
            parseInt(page)
        );

        ApiResponse.success(res, {
            data: guides,
            message: "Guides fetched successfully"
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// GET GUIDE BY ID
export const getGuideById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const guide = await getGuideByIdService(id);

        ApiResponse.success(res, {
            data: guide,
            message: "Guide fetched successfully"
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// GET VERIFIED GUIDES ONLY
export const getVerifiedGuides = async (req, res, next) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const guides = await getVerifiedGuidesService(
            parseInt(limit),
            parseInt(page)
        );

        ApiResponse.success(res, {
            data: guides,
            message: "Verified guides fetched successfully"
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// GET GUIDES BY REGION
export const getGuidesByRegion = async (req, res, next) => {
    try {
        const { region } = req.params;
        const { limit = 10, page = 1 } = req.query;

        const guides = await getGuidesByRegionService(
            region,
            parseInt(limit),
            parseInt(page)
        );

        ApiResponse.success(res, {
            data: guides,
            message: `Guides in region '${region}' fetched successfully`
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// GET GUIDES BY SPECIALITY
export const getGuidesBySpeciality = async (req, res, next) => {
    try {
        const { speciality } = req.params;
        const { limit = 10, page = 1 } = req.query;

        const guides = await getGuidesBySpecialityService(
            speciality,
            parseInt(limit),
            parseInt(page)
        );

        ApiResponse.success(res, {
            data: guides,
            message: `Guides with speciality '${speciality}' fetched successfully`
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// VERIFY GUIDE (Admin only)
export const verifyGuide = async (req, res, next) => {
    try {
        const { id } = req.params;

        const guide = await verifyGuideService(id);

        ApiResponse.success(res, {
            data: guide,
            message: "Guide verified successfully",
            status: 200
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// REJECT GUIDE VERIFICATION (Admin only)
export const rejectGuide = async (req, res, next) => {
    try {
        const { id } = req.params;

        const guide = await rejectGuideService(id);

        ApiResponse.success(res, {
            data: guide,
            message: "Guide verification rejected successfully"
        });
    } catch (err) {
        next(err);
    }
};


export const getGuideCollaborations = async (req, res) => {
    const guideProfile = await Guide.findById(req.params.guideId)
        .populate({
            path: "collaborations",
            select: "name thumbnail regions daysAlloted guide isActive startingPrice pricePerPerson"
        })
        .lean();
    if (!guideProfile) throw new ApiError(404, "Guide not found");
    return ApiResponse.success(res, {
        data: guideProfile.collaborations,
        message: "Guide collaborations retrieved successfully"
    });
};

// ============================================================================================
// UPDATE GUIDE PROFILE
export const updateGuideProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const file = req.file;

        const guide = await updateGuideProfileService(id, req.body, file);

        ApiResponse.success(res, {
            data: guide,
            message: "Guide profile updated successfully"
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// GET GUIDE STATISTICS
export const getGuideStats = async (req, res, next) => {
    try {
        const { id } = req.params;

        const stats = await getGuideStatsService(id);

        ApiResponse.success(res, {
            data: stats,
            message: "Guide statistics fetched successfully"
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// DELETE GUIDE (Admin only)
export const deleteGuide = async (req, res, next) => {
    try {
        const { id } = req.params;

        const guide = await deleteGuideService(id);

        ApiResponse.success(res, {
            data: guide,
            message: "Guide deleted successfully",
            status: 200
        });
    } catch (err) {
        next(err);
    }
};

// ============================================================================================
// SEARCH GUIDES
export const searchGuides = async (req, res, next) => {
    const guides = await searchGuidesService(req.query);
    
    ApiResponse.success(res, {
        data: guides,
        message: `Search results fetched successfully`
    });
};

// ============================================================================================
// GET UNVERIFIED GUIDES (Admin only)
export const getUnverifiedGuides = async (req, res, next) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const guides = await getUnverifiedGuidesService(
            parseInt(limit),
            parseInt(page)
        );

        ApiResponse.success(res, {
            data: guides,
            message: "Unverified guides fetched successfully"
        });
    } catch (err) {
        next(err);
    }
};


export const toggleGuideAvailability = async (req, res) => {
    await toggleGuideAvailabilityService(req.user._id);

    return ApiResponse.success(res, {
        data: null,
        message: "Guide's availability has been toggeled"
    });
}