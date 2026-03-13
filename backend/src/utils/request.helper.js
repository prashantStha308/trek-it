import bcrypt from "bcrypt";
import {User, Guide, Tourist, Admin} from "../models/user/index.js"
import {
	deleteFromCloudinary,
	uploadToCloudinary,
} from "./cloudinary.services.js"

/**
 * Validates Object Keys.
 *
 * @param {Object} targetObject - File buffer received from multer.
 * @param {string[]} validationArray - Array of Strings that contains all the keys that the targetObject must resolve
 * @returns {boolean} True if the object is valid
 * @throws {Error} if validation is failed
 */
export const validateObject = (targetObject, validationArray = []) => {
	if (!targetObject || typeof targetObject !== 'object') {
		throw new Error('Invalid input: expected a non-null object');
	}

	const objectKeys = Object.keys(targetObject);
	const missingKeys = validationArray.filter(key => !objectKeys.includes(key));
	const emptyKeys = validationArray.filter(key => {
		const val = targetObject[key];
		return val === null || val === undefined || val === '';
	});

	if (missingKeys.length > 0) {
		throw new Error(`Missing required fields: ${missingKeys.join(', ')}`);
	}

	if (emptyKeys.length > 0) {
		throw new Error(`Fields cannot be empty: ${emptyKeys.join(', ')}`);
	}

	return true;
};

export const checkExistingUserByEmail = async (email) => {
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error("Email already in use");
	}
};

export const validatePassword = async (receivedPassword , userPassword) => {
    const isMatch = await bcrypt.compare(receivedPassword, userPassword);
    if (!isMatch) {
        throw new ApiError(400, "Invalid Password");
    }
}

export const getModelByRole = (role) => {
	let model;

	switch(model){
		case "tourist":
			model = Tourist;
			break;
		case "guide":
			model = Guide;
			break;
		default:
			model = User
	}

	return model;
}

export const updateProfilePicture = async(publicId, file)=>{
		
	const [
		deleteRes,
		uploadRes
	] = await Promise.allSettled([
		deleteProfilePicture(publicId),
		uploadProfilePicture(file)	
	]);

	return uploadRes;
}

export const uploadProfilePicture = async(file) =>{
	return uploadToCloudinary(file.buffer, "profilePicture", "image") 
}

export const uploadDocs = async(file, docType) =>{
	return uploadToCloudinary(file.buffer, "doc", "auto") 
}


export const deleteProfilePicture = async(publicId) =>{
	return deleteFromCloudinary(publicId, "image"); 
}


export const deleteDocs = async(publicId) =>{
	return deleteFromCloudinary(publicId, "auto"); 
}