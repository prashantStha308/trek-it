import { User, Guide, Tourist, Admin } from "../../models/index.js";

import {
	createUserService,
	loginService,
} from "./auth.service.js";

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
	
	res.cookie('token', loginData.token, {httpOnly: true}).status(200).json({success: true, message: "Sent login details", data: loginData});
}
