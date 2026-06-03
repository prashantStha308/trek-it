import mongoose from "mongoose";
import {Chat, Message} from "../../models/index.js";
// utils and helpers
import { uploadImage } from "../../utils/cloudinary.services.js";
import {
    getAll
} from "../../utils/crud.service.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
    findChatOrCreateService,
} from "./chat.service.js"



export const uploadFile = async (req, res) => {
    const file = req.file;
    if (!file) return;

    const fileRes = await uploadImage(file, "chatImg");
    
    return ApiResponse.success(res, {
        status: 200,
        data: fileRes,
        message: "Successfully uploaded file"
    });
}

export const getAllMessages = async (req, res) => {

    console.log("getAllMessages hit");

    const { chatId } = req.params;
    const { limit, page } = req.query;
    const user = req.user;

    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new ApiError(400, "Invalid chatId");
    }

    const messages = await getAll(Message, {
        limit,
        page,
        filter: { chat: chatId },
        populate: [
            {
                path: "sender",
                select: "_id name role"
            }
        ],
        sort:{
            createdAt: -1
        }
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
        filter: { participants: user._id  },
        populate: [
            {
                path: "participants",
                select: "_id name profilePicture role"
            },
            {
                path: "lastMessage",
                select: "_id content isRead isEdited"
            }
        ]
    });

    return ApiResponse.success(res, {
        status: 200,
        data: chats,
        message: "Chats acquired"
    });
}

export const getOrCreateDirectChat = async (req, res) => {
    const user = req.user;
    const { receiptantId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(receiptantId)) {
        throw new ApiError(400, "Invalid receiptantId");
    }

    if (receiptantId === user._id.toString()) {
        throw new ApiError(400, "Cannot create a chat with yourself");
    }

    const participants = [user._id, receiptantId];
    const chat = await findChatOrCreateService(participants);

    return ApiResponse.success(res, {
        status: 200,
        data: chat,
        message: "Chat acquired"
    });
}