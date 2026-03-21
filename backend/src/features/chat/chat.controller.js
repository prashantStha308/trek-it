import mongoose from "mongoose";
import Conversation from "../../models/chat/conversation.model.js";
import ApiError from "../../utils/ApiError.js";
import { getById } from "../../utils/crud.service.js";
import chatGateway from "./chat.gateway.js";
import {
    addParticipantToConversation,
    createConversation,
} from "./chat.service.js";

function chatController(io, socket) {
    const gateway = chatGateway(io, socket);
    const userId = socket.data.user._id;

    const join = async (chatId) => {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            throw new Error("Invalid Chat");
        }

        let chat = await getById(Conversation, chatId);

        if(!chat){
            throw new ApiError(404, "Chat not found");
        }


        if (!chat.participants.find((person) => person._id.toString() == userId.toString())) {
            await addParticipantToConversation(userId, chatId);
        }

        gateway.joinChat(chatId);
        gateway.emitToSocket("chat:joined", { chatId });
    };

    const leave = async () => {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            throw new Error("Invalid Chat");
        }

        gateway.leaveChat(socket.data.currentChat);
        gateway.emitToSocket("chat:left");
    };

    const createChat = async (data) => {
        const { participants=[], type = "direct" } = data
        console.log("Passed: ",data);

		if (!participants.every(id => mongoose.Types.ObjectId.isValid(id))) {
		    throw new Error("Invalid participant");
		}
        const conversation = await createConversation(participants,type);

        gateway.joinChat(conversation._id);
        gateway.emitToSocket("chat:created", { conversation });
    };


    const sendMessage = async(message )=>{

    	gateway.emitToChat("chat:messageSent", {

    	})
    }

    return {
    	join,leave,
    	createChat,
        sendMessage,
    };
}

export default chatController;