import express from "express";
import { authorize } from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.middleware.js";
import { body } from "express-validator";
import { validateCustomRequestParams } from "../../middlewares/validation/request.validation.js";
import {
    createCustomRequest,
    getMyCustomRequests,
    acceptCustomRequest,
    rejectCustomRequest,
    withdrawCustomRequest,
} from "./customRequests.controller.js";

const customRequestR = express.Router();

// Tourist sends a customization request for a package
customRequestR.post(
    "/",
    authorize(["tourist"]),
    [
        body("packageId").isMongoId().withMessage("packageId must be a valid MongoDB ObjectId"),
        body("groupSize").isInt({ min: 1 }).withMessage("groupSize must be a positive integer"),
        body("description").optional().trim(),
    ],
    validate,
    createCustomRequest
);

// Get own requests (tourist sees requests they sent, guide sees requests they received)
customRequestR.get(
    "/mine",
    authorize(["tourist", "guide"]),
    getMyCustomRequests
);

// Guide accepts a request
customRequestR.patch(
    "/:requestId/accept",
    authorize(["guide"]),
    validateCustomRequestParams,
    validate,
    acceptCustomRequest
);

// Guide rejects a request
customRequestR.patch(
    "/:requestId/reject",
    authorize(["guide"]),
    validateCustomRequestParams,
    validate,
    rejectCustomRequest
);

// Tourist withdraws a pending request
customRequestR.delete(
    "/:requestId",
    authorize(["tourist"]),
    validateCustomRequestParams,
    validate,
    withdrawCustomRequest
);

export { customRequestR };
