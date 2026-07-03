import { User, Guide, Tourist, Admin } from "../../models/index.js";

import {
	createUserService,
	loginService,
} from "./auth.service.js";

import ApiResponse from "../../utils/ApiResponse.js";

export const createTourist = async (req, res) => {
	const tourist = await createUserService(req.body, Tourist, req.file);
	
	return ApiResponse.success(res, {
		status: 201,
		message: "Tourist registered successfully",
		data: tourist
	});
};

export const createGuide = async (req, res) => {
	const guide =  await createUserService(req.body, Guide, req.file);

	return ApiResponse.success(res, {
		message: "Guide registered successfully",
		data: guide,
		status: 201
	});
};

export const login = async(req, res) => {
	const {safeUser, token} = await loginService(req.body);

	return ApiResponse.success(res, {
		message: "Logged in successfully",
		data: safeUser,
		before: [
			ApiResponse.setCookie('token', token)
		]
	});
}

export const logout = async (req, res) => {

	console.log("logout")

	return ApiResponse.success(res, {
		message: "Logged Out",
		before: [
			ApiResponse.clearCookie('token')
		]
	});
}
