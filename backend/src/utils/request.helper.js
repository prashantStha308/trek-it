import bcrypt from "bcrypt";
import {User, Guide, Tourist, Admin} from "../models/user/index.js"

export const validateObject = (object, validationArray = []) => {
	if (!object || typeof object !== 'object' || Array.isArray(object)) {
		throw new Error('Invalid input: expected a non-null object');
	}

	const objectKeys = Object.keys(object);
	const missingKeys = validationArray.filter(key => !objectKeys.includes(key));
	const emptyKeys = validationArray.filter(key => {
		const val = object[key];
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