import express from "express";
// Config
import {bufferUpload} from "../../config/multer.config.js";
// Middlewares
import {authorize} from "../../middlewares/authorize.js";

// Controller
import {
	getAllUsers, getUserById,
	updateUser,
	deleteUser
} from "./users.controller.js";

const userR = express.Router();

// api/user

// GET
userR.get("/",getAllUsers );

// UPDATE
userR.put("/", authorize([]), bufferUpload.single("profilePicture"),  updateUser);

//DELETE
userR.delete("/", authorize([]),  deleteUser);

// dymaic routes
userR.get("/:id", getUserById);

export default userR;