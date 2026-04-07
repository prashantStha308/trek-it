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

export const getAllUsers = async(req, res) => {
	let {limit, page, ...filter} = req.query;

	const users = await getAll(User, {
		limit, page,
		select: "-password",
		filter
	});

	return ApiResponse.success(res, {
		status: 200,
		message: "Acquired all users' datas",
		data: users
	})
}

export const getUserById = async(req,res) => {
	const user = await getById(User, req.params.userId, {
		select: "-password"
	});

	return ApiResponse.success(res, {
		status: 200,
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

	return ApiResponse.success(res,{
		status: 200,
		message: "User updated successfully",
		data: user
	});
};

export const deleteUser = async(req, res) => {
	const user = await deleteUserService(req.user._id);

	return ApiResponse.success(res,{
		status: 200,
		message: "User deleted successfully",
		data: user
	});
}