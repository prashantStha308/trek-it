import mongoose from "mongoose";
// Models
import Chat from "../../models/chat/chat.model.js";
import Message from "../../models/chat/message.model.js";
import { User } from "../../models/user/index.model.js";
// Utils
import ApiError from "../../utils/ApiError.js";


export const createChatService = async (participants = [], type = "direct") => {
    console.log("in service: ", participants);
    if (participants.length < 2) {
        throw new Error("A Chat must have at least 2 participants");
    }

    const newChat = await Chat.create({ participants, type });
    return newChat;
}

export const addParticipantService = async (participantId, chatId) => {
    if (!mongoose.Types.ObjectId.isValid(chatId) || !mongoose.Types.ObjectId.isValid(participantId)) {
        throw new Error(404, "Invalid Participant Id OR Conversation Id ");
    }

    const chatRes = await Chat.findById(conversationId);

    if (chatRes.participants.find(participant => participant._id === participantId)) {
        // even though an error, it isn't destructive, so sent a 200 code instead.
        throw new ApiError(200, "Participants already exists");
    }

    chatRes.participants = [...chatRes.participants, participantId];
    chatRes.save();

    return chatRes;
}

export const saveMessageService = async (messageObj) => {
    if (messageObj === null || messageObj.content === null || messageObj.content.trim() === "") {
        throw new ApiError(404, "Message cannot be empty");
    }

    const newMessage = await Message.create(messageObj);
    return newMessage;
}

export const updateMessageService = async({messageId, content})=>{
    const targetMsg = await Message.findById(messageId);

    if(!targetMsg){
        throw new ApiError(404, "Message not found");
    }

    targetMsg.content = content;
    await targetMsg.save();
}


export const joinConversationService = async(chatId, userId)=>{
    if (!mongoose.Types.ObjectId.isValid(chatId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid chatId OR userId");
    }
    let chat = await Chat.findById(chatId);
    if(!chat) throw new ApiError(404, "Chat not found");
    
    let promises = [];
    if (!chat.participants.find((person) => person._id.toString() == userId.toString())) {
        promises.push(addParticipantService(userId, chatId));
    }
    if(chat.lastMessage){
        const lastMessage = await Message.findById(chat.lastMessage);
        if(lastMessage){
            lastMessage.readBy = [...lastMessage.readBy, { reader: userId, readAt: Date.now() }];
            promises.push(lastMessage.save());
        }
    }
    await Promise.allSettled(promises);
}