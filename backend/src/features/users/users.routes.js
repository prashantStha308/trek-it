import express from "express";
// Config
import {bufferUpload} from "../../config/multer.config.js";
// Middlewares
import { authorize } from "../../middlewares/authorize.js";
import {
	validateUserBody,
	validateUserQuery,
	validateUserParams
} from "../../middlewares/validation/index.js"
import validate from "../../middlewares/validate.middleware.js";
// Controller
import {
	getAllUsers, getUserById, getMe,
	updateUser,
	deleteUser
} from "./users.controller.js";


// api/users
const userR = express.Router();

// GET
userR.get("/", validateUserQuery, validate, getAllUsers);
userR.get("/me", authorize(), getMe );

// UPDATE
userR.patch("/", authorize(), validateUserBody, validate, bufferUpload.single("profilePicture"),  updateUser);

//DELETE
userR.delete("/", authorize(), deleteUser);

// dynamic routes
userR.get("/:userId", validateUserParams, validate, getUserById);

export {userR};