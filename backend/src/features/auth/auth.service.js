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
	await checkExistingUserByEmail(body.email);

// for seeder, will remove later
	if (!body.address && body['address.country']) {
	    body.address = {
	        country: body['address.country'],
	        state: body['address.state'],
	    };
	}
	console.log("Body: ", body);
	console.log("body.address: ", body.address);

	const hashedPassword = await bcrypt.hash(body.password, 10);
	let profilePicture = {};

	if(file){
		const imgRef = await uploadImage(file);
		console.log("User image Ref: ", imgRef);
		
		profilePicture.src = imgRef.src;
		profilePicture.publicId = imgRef.publicId;
	}

	const user = await Model.create({
		...body,
		profilePicture,
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

    const user = await User.findOne({ email }).select("+password").lean();
    if (!user) {
        throw new ApiError(404, 'Unregistered Email');
    }

    await validatePassword(body.password , user.password);
    const token = jwt.sign({ id: user._id , role: user.role }, JWT_SECRET, {
        expiresIn: '30d',
    });

	const {password, ...safeUser} = user;

    return {safeUser, token};
}
