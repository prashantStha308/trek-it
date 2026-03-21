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

const userRouter = express.Router();

// api/user

// GET
userRouter.get("/",getAllUsers );

// UPDATE
userRouter.put("/", authorize([]), bufferUpload.single("profilePicture"),  updateUser);

//DELETE
userRouter.delete("/", authorize([]),  deleteUser);

// dymaic routes
userRouter.get("/:id", getUserById);

export default userRouter;