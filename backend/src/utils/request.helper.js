import bcrypt from "bcrypt";
import path from "node:path";
import {User, Guide, Tourist, Admin, Booking} from "../models/index.js"
import {
	uploadImage,
	deleteImage
} from "./cloudinary.services.js"
import ApiError from "./ApiError.js";

/**
 * Validates the keys and values of an object against a list of allowed fields.
 *
 * @param {Object} targetObject - The object to validate (typically req.body).
 * @param {string[]} validationArray - Fields to validate against. In default mode, all fields are required. In update mode, at least one must be present.
 * @param {Object} [options={}] - Optional configuration.
 * @param {boolean} [options.isUpdate=false] - If true, validates as a partial update (at least one valid field required instead of all).
 * @returns {boolean} True if the object is valid.
 * @throws {ApiError} If validation fails (missing fields, empty values, or no valid fields in update mode).
 */
export const validateObject = (targetObject, validationArray = [], { isUpdate = false } = {}) => {
    if (!targetObject || typeof targetObject !== 'object') {
        throw new ApiError(400, 'Invalid input: expected a non-null object');
    }

    if (isUpdate) {
        const hasValidField = Object.keys(targetObject).some(k => validationArray.includes(k));
        if (!hasValidField) {
            throw new ApiError(400, `At least one of [${validationArray.join(', ')}] is required`);
        }

        const emptyKeys = Object.keys(targetObject).filter(key => {
            const val = targetObject[key];
            return validationArray.includes(key) && (val === null || val === undefined || val === '');
        });

        if (emptyKeys.length > 0) {
            throw new ApiError(400, `Fields cannot be empty: ${emptyKeys.join(', ')}`);
        }

        return true;
    }

    const objectKeys = Object.keys(targetObject);
    const missingKeys = validationArray.filter(key => !objectKeys.includes(key));
    const emptyKeys = validationArray.filter(key => {
        const val = targetObject[key];
        return val === null || val === undefined || val === '';
    });

    if (missingKeys.length > 0) {
        throw new ApiError(400, `Missing required fields: ${missingKeys.join(', ')}`);
    }

    if (emptyKeys.length > 0) {
        throw new ApiError(400, `Fields cannot be empty: ${emptyKeys.join(', ')}`);
    }

    return true;
};

export const checkExistingUserByEmail = async (email) => {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new ApiError(400,"Email already in use");
	}
};

export const validatePassword = async (receivedPassword , userPassword) => {
    const isMatch = await bcrypt.compare(receivedPassword, userPassword);
    if (!isMatch) {
        throw new ApiError(400, "Invalid Password");
    }
}

export const updateProfilePicture = async(publicId, file)=>{
		
	const [
		deleteRes,
		uploadRes
	] = await Promise.allSettled([
		deleteImage(publicId),
		uploadImage(file)
	]);

	return uploadRes;
}

export const validateFileExt = (file)=>{
	 const allowedExtensions = [
		// images
		".png", ".jpeg", ".jpg", ".webp",
		// documents
		".pdf", ".txt",
		".doc", ".docx",
		".ppt", ".pptx",
		".xls", ".xlsx"
	];

	 const ext = path.extname(file.originalname).toLowerCase();

	if (!allowedExtensions.includes(ext)) {
		throw new Error("Invalid files type");
	}
}

export const checkValidBooking = async (touristId, { packageId, guideId }) => {
    const query = { tourist: touristId };

    if (packageId) query.package = packageId;
    if (guideId) query.guide = guideId;

    const booking = await Booking.findOne(query).lean();

    if (!booking) {
        throw new ApiError(400, "User has not booked a tour with this guide or package.");
    }

    return true;
}