import mongoose from "mongoose";
import Chat from "../../models/chat/chat.model.js";
import Message from "../../models/chat/message.model.js";
import ApiError from "../../utils/ApiError.js";
import { getById } from "../../utils/crud.service.js";
import chatGateway from "./chat.gateway.js";
import {
    addParticipantService,
    createChatService,
    sendMessageService,
    readService,
    joinChatService,
    deleteMessageService,
} from "./chat.service.js";

function chatHandler(io, socket) {
    const gateway = chatGateway(io, socket);
    const userId = socket.data.user._id;

    const join = async ({chatId}) => {
        await joinChatService(chatId, userId);

        gateway.joinChat(chatId);
        gateway.emitToSocket("chat:joined", { chatId });
        gateway.emitToChat("chat:userJoined", userId);
    };

    const leave = async () => {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            throw new Error("Invalid Chat");
        }

        gateway.leaveChat(socket.data.currentChat);
        gateway.emitToSocket("chat:left");
    };

    const createChat = async (data) => {
        const { participants=[], type = "direct" } = data;
        console.log(data);

		if (!participants.every(id => mongoose.Types.ObjectId.isValid(id))) {
		    throw new Error("Invalid participant");
		}
        const chat = await createChatService(participants,type);
        console.log();

        gateway.joinChat(chat._id);
        gateway.emitToSocket("chat:created", { chat });
    };

    const sendMessage = async (messageData) => {
        const chatId = socket.data.currentChat;
        if (!chatId) throw new ApiError(400, "Not in a chat");
        
        const message = {
            chat: chatId,
            sender: userId,
            ...messageData
        }
        const messageRes = await sendMessageService(message);

        gateway.emitToSocket("chat:messageSent", messageRes);
        gateway.emitToChat("chat:messageReceived", messageRes);
    };

    const sendFile = async(file)=>{
        console.log("File received");
        console.log("File: ", file)

        gateway.emitToChat("chat:fileReceived");
    }

    const sendImage = async(image)=>{
        console.log("Image received");
        console.log("Image: ", image)

        gateway.emitToChat("chat:fileReceived");
    }

    const readLatest = async ()=>{
        await readService(socket.data.currentChat, userId);
    }

    const updateMessage = async(data)=>{
        const {messageId, content} = data;
        // update this
    }

    const deleteMessage = async({messageId}) => {
        const messageRes = await deleteMessageService(messageId);

        gateway.emitToChat("chat:deleted", messageId); 
    }

    return {
    	join,leave,
    	createChat,
        sendMessage, sendFile, sendImage,
        readLatest,
        updateMessage, deleteMessage,
    };
}

export default chatHandler;