import { User, Guide, Tourist, Admin } from "../../models/user/index.model.js";

import {getModelByRole} from "../../utils/request.helper.js"

import {
	getAllUsersService,
	getUserByIdService,
	updateUserService,
	deleteUserService
} from "./users.service.js";

// TODO: Add uplodaing assets service when user create account, for their profile picture, if they've set it. 

export const createTourist = async (req, res) => {
	const tourist =  await createUserService(req.body, Tourist, req.file);

	res.status(201).json({
		success: true,
		message: "Tourist registered successfully",
		data: tourist
	});
};

export const createGuide = async (req, res) => {
	const guide =  await createUserService(req.body, Guide, req.file);

	res.status(201).json({
		success: true,
		message: "Guide registered successfully",
		data: guide
	});
};

export const login = async(req, res) => {
	const loginData = await loginService(req.body);

	res.status(200).json({
		success: true,
		message: "Sent login details",
		data: loginData
	})
}

export const getAllUsers = async(req, res) => {
	let {limit, page, role} = req.query;

	limit = Math.max(1, parseInt(limit));
	page = Math.max(1, parseInt(page));

	const users = await getAllUsersService(getModelByRole(role), limit, page);

	res.status(200).json({
		success: true,
		message: "Acquired all users' datas",
		data: users
	})
}

export const getUserById = async(req,res) => {
	const user = await getUserByIdService(req.params.id);

	res.status(200).json({
		success: true,
		message: "Acquired User's data",
		data: user
	})
}

export const updateUser = async (req, res) => {

	const user = await updateUserService(
		req.user._id,
		req.body,
		req.file
	);

	res.status(200).json({
		success: true,
		message: "User updated successfully",
		data: user
	});
};

export const deleteUser = async(req, res) => {
	const user = await deleteUserService(req.user._id);

	res.status(200).json({
		success: true,
		message: "User deleted successfully",
		data: user
	});
}