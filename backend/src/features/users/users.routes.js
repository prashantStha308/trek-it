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
	getAllUsers, getUserById,
	updateUser,
	deleteUser
} from "./users.controller.js";


// api/user
const userR = express.Router();

// GET
userR.get("/", validateUserQuery, validate, getAllUsers );

// UPDATE
userR.patch("/", authorize, validateUserBody, validate, bufferUpload.single("profilePicture"),  updateUser);

//DELETE
userR.delete("/", authorize, deleteUser);

// dynamic routes
userR.get("/:userId", validateUserParams, validate, getUserById);

export default userR;