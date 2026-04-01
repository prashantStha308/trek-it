import express from "express";
import bufferUpload from "../../config/multer.config.js";
import authorize from "../../middlewares/authorize.js";
import validate from "../../middlewares/validate.middleware.js";
import { } from "../../middlewares/validation/index.js";

const reviewR = express.Router();



export default reviewR;