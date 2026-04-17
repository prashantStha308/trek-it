import express from "express";
import {bufferUpload} from "../../config/multer.config.js";
import {
	createTourist,
	createGuide,
	login, logout,
} from "./auth.controller.js";
import {
	validateTouristBody,
	validateGuideBody,
	validateLoginBody
} from "../../middlewares/validation/index.js"

const authR = express.Router();

// api/auth
// POST
// by default, go for tourist
authR.post("/", validateTouristBody, bufferUpload.single("profilePicture"),createTourist);

authR.post("/guide", validateGuideBody, bufferUpload.single("profilePicture"), createGuide);

authR.post("/login", validateLoginBody, login);

authR.post("/logout", logout);


export {authR};