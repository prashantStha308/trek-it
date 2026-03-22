import mongoose from "mongoose";
import Chat from "../../models/chat/chat.model.js";
import Message from "../../models/chat/message.model.js";
import ApiError from "../../utils/ApiError.js";
import { getById } from "../../utils/crud.service.js";
import chatGateway from "./chat.gateway.js";
import {
    addParticipantService,
    createChatService,
    saveMessageService,
    joinConversationService,
} from "./chat.service.js";

function chatController(io, socket) {
    const gateway = chatGateway(io, socket);
    const userId = socket.data.user._id;

    const join = async ({chatId}) => {
        await joinConversationService(chatId, userId);

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

        const { content = "", files = [] } = messageData;

        const message = await saveMessageService({
            chat: chatId,
            sender: userId,
            content,
            files,
        });

        gateway.emitToChat(chatId, "chat:messageSent", { message });
    };


    const updateMessage = async(data)=>{
        const {messageId, content} = data;
    }

    return {
    	join,leave,
    	createChat,
        sendMessage,
    };
}

export default chatController;