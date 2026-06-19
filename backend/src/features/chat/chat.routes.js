import express from "express";
import { authorize } from "../../middlewares/authorize.js";
import { bufferUpload } from "../../config/multer.config.js";
import {
    uploadFile,
    getAllMessages,
    getUserChats,
    getOrCreateDirectChat,
} from "./chat.controller.js";
import {
    validateChatBody,
    validateChatQuery,
    validateChatParams
} from "../../middlewares/validation/index.js"
import validate from "../../middlewares/validate.middleware.js";

const chatR = express.Router();


// uploads images uploaded by user via chat. Frontend must keep the input field's name as "chatImg"
chatR.post('/file', authorize() , validateChatBody, validate, bufferUpload.single("chatImg"), uploadFile);

// Get all messages of user(limits to 15 per page by default)
chatR.get('/', authorize(), validateChatQuery, validate, getUserChats)

// Dynamic routes
chatR.get('/messages/:chatId', authorize(), validateChatParams, validate, getAllMessages);

// open direct chat with a user
chatR.post('/direct', authorize(), getOrCreateDirectChat);

export {chatR};