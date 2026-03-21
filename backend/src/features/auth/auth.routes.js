import express from "express";
import {bufferUpload} from "../../config/multer.config.js";
import {
	createTourist,
	createGuide,
	login,
} from "./auth.controller.js";

const authR = express.Router();

// api/auth
// POST
// by default, go for tourist
authR.post("/", bufferUpload.single("profilePicture"),createTourist);

authR.post("/guide", bufferUpload.single("profilePicture"), createGuide);

authR.post("/login", login);


export default authR;