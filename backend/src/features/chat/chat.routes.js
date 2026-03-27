import express from "express";
import { authorize } from "../../middlewares/authorize.js";
import { bufferUpload } from "../../config/multer.config.js";
import {
    uploadFile,
    getAllMessages,
    getUserChats
} from "./chat.controller.js";

const chatR = express.Router();

// ----------------------------------- Routes -----------------------------------

// uploads images uploaded by user via chat. Frontend must keep the input field's name as "chatImg"
chatR.post('/file', authorize(), bufferUpload.single("chatImg"), uploadFile);

// Get all messages of user(limits to 10 per page by default)
chatR.get('/', authorize(), getUserChats)

// ----------------------------------- Dynamic Routes -----------------------------------
chatR.get('/messages/:chatId', authorize(), getAllMessages);



export default chatR;