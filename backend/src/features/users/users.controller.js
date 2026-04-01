import { User, Guide, Tourist, Admin } from "../../models/index.js";
// Services
import {
	updateUserService,
	deleteUserService
} from "./users.service.js";
// Helpers
import ApiResponse from "../../utils/ApiResponse.js";
import {
	getAll,
	getById
} from "../../utils/crud.service.js";

// TODO: Add uplodaing assets service when user create account, for their profile picture, if they've set it. 

export const createTourist = async (req, res) => {
	const tourist =  await createUserService(req.body, Tourist, req.file);

	ApiResponse.success(201, {
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

	return ApiResponse.success(200, {
		success: true,
		message: "Sent login details",
		data: loginData
	})
}
	
export const getAllUsers = async(req, res) => {
	let {limit, page, role} = req.query;

	const users = await getAll(User, {
		limit, page,
		select: "-password",
		filter:{role}
	});

	return ApiResponse.success(res,{
		success: true,
		message: "Acquired all users' datas",
		data: users
	})
}

export const getUserById = async(req,res) => {
	const user = await getById(User, req.params.id, {
		select: "-password"
	});

	return ApiResponse.success(200, {
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

	return ApiResponse.success(200,{
		success: true,
		message: "User updated successfully",
		data: user
	});
};

export const deleteUser = async(req, res) => {
	const user = await deleteUserService(req.user._id);

	return ApiResponse.success(200,{
		success: true,
		message: "User deleted successfully",
		data: user
	});
}