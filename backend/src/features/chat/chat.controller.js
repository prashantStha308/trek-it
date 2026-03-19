import mongoose from "mongoose";
import Conversation from "../../models/chat/conversation.model.js";
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

        const chat = await getById(Conversation, chatId);

        if (!chat.participants.find((person) => person._id.toString() == userId.toString())) {
            await addParticipantToConversation(userId, chatId);
        }

        gateway.joinChat(chatId);
        gateway.emitToSocket("chat:joined", { chatId });
    };

    const leave = async (chatId) => {
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            throw new Error("Invalid Chat");
        }

        gateway.leaveChat(chatId);
        gateway.emitToSocket("chat:left", { chatId });
    };

    const create = async ({ participantId, type = "direct" }) => {
        if (!mongoose.Types.ObjectId.isValid(participantId)) {
            throw new Error("Invalid participant");
        }

        const conversation = await createConversation({
            participants: [userId, participantId],
            type,
        });

        gateway.joinChat(conversation._id);
        gateway.emitToSocket("chat:created", { conversation });
    };

    return { join, leave, create };
}

export default chatController;