import express from "express";
// Config
import {bufferUpload} from "../../config/multer.config.js";
// Middlewares
import authorize from "../../middlewares/authorize.js";

// Controller
import {
	createTourist, createGuide,
	login,
	getAllUsers, getUserById,
	updateUser,
	deleteUser
} from "./user.controller.js";

const userRouter = express.Router();

// api/user

// POST
// by default, go for tourist
userRouter.post("/new", bufferUpload.single("profilePicture"),createTourist);

userRouter.post("/new/guide", bufferUpload.single("profilePicture"), createGuide);

userRouter.post("/login", login);

// GET
userRouter.get("/all",getAllUsers );

// UPDATE
userRouter.put("/", authorize([]),  updateUser);

//DELETE
userRouter.delete("/", authorize([]),  deleteUser);

// dymaic routes
userRouter.get("/:id", getUserById);

export default userRouter;