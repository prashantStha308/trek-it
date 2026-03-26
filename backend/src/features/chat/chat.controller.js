import mongoose from "mongoose";
import Chat from "../../models/chat/chat.model.js";
import Message from "../../models/chat/message.model.js";
// utils and helpers
import { uploadImage } from "../../utils/cloudinary.services.js";
import {
    getAll
} from "../../utils/crud.service.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) return;

    const fileRes = await uploadImage(file.buffer);
    
    return ApiResponse.success(res, {
        status: 200,
        data: fileRes,
        message: "Successfully uploaded file"
    });
}

export const getAllMessages = async (req, res) => {
    const { chatId } = req.params;
    const { limit, page } = req.query;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new ApiError(400, "Invalid chatId");
    }

    const messages = await getAll(Message, {
        limit,
        page,
        filter: { chat: chatId, participants: user._id }
    });

    return ApiResponse.success(res, {
        status: 200,
        data: messages,
        message: "Messages aquired"
    })
}

export const getUserChats = async (req, res) => {
    const user = req.user;
    const { limit, page } = req.query;

    const chats = await getAll(Chat, {
        limit, page,
        filter: { participants: user._id  }
    });

    return ApiResponse.success(res, {
        status: 200,
        data: chats,
        message: "Chats acquired"
    });
}