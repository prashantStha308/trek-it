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
}