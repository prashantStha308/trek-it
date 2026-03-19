import mongoose from "mongoose";
// Models
import Conversation from "../../models/chat/conversation.model";
import Message from "../../models/chat/message.model.js";
import { User } from "../../models/user/index.model.js";
// Utils
import ApiError from "../../utils/ApiError.js";

export const createConversation = async (participants = []) => {
    if (participants.length < 2) {
        throw new Error("A conversation must have at least 2 participants");
    }

    const newConversation = await Conversation.create({ participants });
    return newConversation;
}

export const addParticipantToConversation = async (participantId, conversationId) => {
    if (!mongoose.Types.ObjectId.isValid(conversationId) || !mongoose.Types.ObjectId.isValid(participantId)) {
        throw new Error(404, "Invalid Participant Id OR Conversation Id ");
    }

    const conversationRes = await Conversation.findById(conversationId);

    if (conversationRes.participants.find(participant => participant._id === participantId)) {
        // even though an error, it isn't destructive, so sent a 200 code instead.
        throw new ApiError(200, "Participants already exists");
    }

    conversationRes.participants = [...conversationRes.participants, participantId];
    conversationRes.save();

    return conversationRes;
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