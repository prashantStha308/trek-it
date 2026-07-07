import express from "express";
import { bufferUpload } from "../../config/multer.config.js";
import { authorize } from "../../middlewares/authorize.js";
import {
    getAllGuides,
    getGuideById,
    getVerifiedGuides,
    getGuidesByRegion,
    getGuidesBySpeciality,
    getGuideStats,
    getGuideCollaborations,

    verifyGuide,
    rejectGuide,
    
    updateGuideProfile,
    deleteGuide,
    searchGuides,
    getUnverifiedGuides,
    toggleGuideAvailability,
} from "./guides.controller.js";

const guidesR = express.Router();

// ============================================================================================
// PUBLIC ROUTES - No authentication required

// GET all guides with filters
// GET /api/guides?limit=10&page=1&region=kathmandu&speciality=trekking&verified=true
guidesR.get("/", getAllGuides);

// GET verified guides only
// GET /api/guides/verified
guidesR.get("/verified", getVerifiedGuides);

// SEARCH guides by name, speciality, or region
// GET /api/guides/search?q=mountain&limit=10&page=1
guidesR.get("/search", searchGuides);

// GET guides by specific region
// GET /api/guides/region/:region
guidesR.get("/region/:region", getGuidesByRegion);

// GET guides by specific speciality
// GET /api/guides/speciality/:speciality
guidesR.get("/speciality/:speciality", getGuidesBySpeciality);

// GET guide by ID
// GET /api/guides/:id
guidesR.get("/:id", getGuideById);

// GET guide statistics
// GET /api/guides/:id/stats
guidesR.get("/:id/stats", getGuideStats);

guidesR.get("/:guideId/collaborations", getGuideCollaborations);

// ============================================================================================
// ADMIN ONLY ROUTES - Requires admin authorization

// GET unverified guides
// GET /api/guides/admin/unverified
guidesR.get(
    "/admin/unverified",
    authorize(["admin"]),
    getUnverifiedGuides
);

// VERIFY guide
// PUT /api/guides/admin/:id/verify
guidesR.put(
    "/admin/:id/verify",
    authorize(["admin"]),
    verifyGuide
);

// REJECT guide verification
// PUT /api/guides/admin/:id/reject
guidesR.put(
    "/admin/:id/reject",
    authorize(["admin"]),
    rejectGuide
);

// toggle isAvailability
guidesR.patch("/", authorize(["guide"]), toggleGuideAvailability);

// DELETE guide
// DELETE /api/guides/admin/:id
guidesR.delete(
    "/admin/:id",
    authorize(["admin"]),
    deleteGuide
);

// ============================================================================================
// AUTHORIZED ROUTES - Requires any logged-in user

// UPDATE guide profile (guide can only update their own)
// PUT /api/guides/:id
guidesR.put(
    "/:id",
    authorize("guide", "admin"),
    bufferUpload.single("profilePicture"),
    updateGuideProfile
);

export { guidesR };
