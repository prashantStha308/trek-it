import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// configs
import { JWT_SECRET } from "../../config/env.config.js";
// Models
import { User } from "../../models/user/index.model.js";
// helpers
import ApiError from "../../utils/ApiError.js";
import {
	validateObject,
	validatePassword,
	checkExistingUserByEmail,
	updateProfilePicture,
} from "../../utils/request.helper.js";
import { deleteProfilePicture } from "../../utils/cloudinary.services.js"

// -----------------------------------------------------------------------------------------------------

export const getAllUsersService = async ( Model = User, limit = 10, page = 1 ) => {

	const users = await Model.find({})
		.skip((page - 1) * limit)
		.limit(limit)
		.select("-password")
		.lean();

	return users;
};

export const getUserByIdService = async(id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError("Invalid user ID");
	}

	const user = await User.findById(id).select('-password').lean();

	if(!user){
		throw new ApiError("User not found");
	}

	return user;
}

export const updateUserService = async (id, body, file) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError("Invalid user ID");
	}

	if (body.role) {
		throw new ApiError("User role cannot be changed");
	}

	const user = await User.findById(id);

	if (!user) {
		throw new ApiError("User not found");
	}

	Object.assign(user, body);
	if (file) {

		const res = await updateProfilePicture( user.profilePicture?.publicId,file );

		user.profilePicture = {
			src: res.secure_url,
			publicId: res.public_id
		};
	}

	await user.save();
	return user;
};

export const deleteUserService = async (id) => {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new ApiError("Invalid user ID");
	}

	const user = await User.findByIdAndDelete(id);
	await deleteProfilePicture(user.profilePicture.publicId);

	return user;
}