import mongoose from "mongoose";
// Models
import Chat from "../../models/chat/Chat.model.js";
import Message from "../../models/chat/message.model.js";
import { User } from "../../models/user/index.model.js";
// Utils
import ApiError from "../../utils/ApiError.js";


export const createChat = async (participants = [], type = "direct") => {
    console.log("in service: ", participants);
    if (participants.length < 2) {
        throw new Error("A Chat must have at least 2 participants");
    }

    const newChat = await Chat.create({ participants, type });
    return newChat;
}

export const addParticipantToChat = async (participantId, chatId) => {
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

/**
 * @param {{content: String, sender: mongoose.Types.ObjectId, conversationId: mongoose.Types.ObjectId, files: String[]}} messageObj 
 * @returns {Message}
 */
export const saveMessageToDb = async (messageObj) => {
    if (messageObj === null || messageObj.content === null || messageObj.content.trim() === "") {
        throw new ApiError(404, "Message cannot be empty");
    }

    const newMessage = await Message.create(messageObj);
    return newMessage;
}
