import mongoose from "mongoose";
// Models
import {
    User, Guide, Tourist,
    Package,
    Booking,
} from "../../models/index.js";
// utils and helpers
import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import {
	validateObject,
} from "../../utils/request.helper.js";
import {
    uploadImages
} from "../../utils/cloudinary.services.js";
import ApiError from "../../utils/ApiError.js";

export const createReviewService = async (body, files) => {
    validateObject(body, ["guide", "title", "rating"]);

    if (files) {
        const [...fileRes] = await uploadImages(files);
    }

}