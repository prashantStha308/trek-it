import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// configs
import { JWT_SECRET } from "../../config/env.config.js";
// Models
import { User } from "../../models/index.js";
// helpers
import ApiError from "../../utils/ApiError.js";
import {
	validateObject,
	validatePassword,
	checkExistingUserByEmail,
	updateProfilePicture,
} from "../../utils/request.helper.js";

import {
	uploadImage,
} from "../../utils/cloudinary.services.js"

// -----------------------------------------------------------------------------------------

export const createUserService = async (body, Model, file) => {
	validateObject(body, ["name", "email", "password", "gender", "age", "location"]);
	await checkExistingUserByEmail(body.email);

	const hashedPassword = await bcrypt.hash(body.password, 10);

	if(file){
		const imgRef = await uploadImage(file);
		body.profilePicture.src = imgRef.src;
		body.profilePicture.publicId = imgRef.publicId;
	}

	const user = await Model.create({
		...body,
		password: hashedPassword
	});

	return {
		id: user._id,
		name: user.name,
		email: user.email
	};
};

export const loginService = async(body) => {
    const email = body.email;

    const user = await User.findOne({ email }).select("-password");
    if (!user) {
        throw new ApiError(404, 'Unregistered Email');
    }

    await validatePassword(body.password , user.password);
    const token = jwt.sign({ id: user._id , role: user.role }, JWT_SECRET, {
        expiresIn: '30d',
    });

    return {user, token};
}
