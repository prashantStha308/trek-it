import mongoose from "mongoose";
import ApiError from "../../utils/ApiError.js";
import chatGateway from "./chat.gateway.js";
import {
    createChatService,
    sendMessageService,
    readService,
    joinChatService,
    leaveChatService,
    deleteMessageService,
    updateMessageService
} from "./chat.service.js";
import { validateObject } from "../../utils/request.helper.js"
import { sendNotificationService } from "../notifications/notifications.service.js";
import {
    NOTIFICATION_EVENTS,
    NOTIFICATION_TITLE
} from "../../constants/notification.constant.js";


function chatHandler(io, socket) {
    const gateway = chatGateway(io, socket);

    const join = async ({ chatId }) => {
        const userId = socket.data.user._id;
        
        const chat = await joinChatService(chatId, userId);

        gateway.joinChat(chat);
        gateway.emitToSocket("chat:joined", { chat });
        gateway.emitToChat("chat:userJoined", userId);
    };

    const leave = async () => {
        await leaveChatService( socket.data.currentChat._id, socket.data.user._id );

        gateway.leaveChat();
        gateway.emitToSocket("chat:left");
    };

    const createChat = async (data) => {
        const { participants=[], type = "direct" } = data;
        console.log(data);

		if (!participants.every(id => mongoose.Types.ObjectId.isValid(id))) {
		    throw new Error("Invalid participant");
        }
        
        participants = [...participants, socket.data.user._id];

        const chat = await createChatService(participants,type);
        console.log();

        gateway.joinChat(chat);
        gateway.emitToSocket("chat:created", { chat });

        // handle notification
    };

    const sendMessage = async (messageData) => {

        validateObject(messageData, ["title", "content", "type"]);

        const userId = socket.data.user._id;
        const chatId = socket.data.currentChat._id;

        if (!chatId) throw new ApiError(400, "Not in a chat");
        
        const message = {
            chat: chatId,
            sender: userId,
            ...messageData
        }
        const messageRes = await sendMessageService(message);

        gateway.emitToSocket("chat:messageSent", messageRes);
        gateway.emitToChat("chat:messageReceived", messageRes);

        // handle sending notifications to other users

        const recipients = socket.data.currentChat.participants
            .filter(p => p.toString() !== userId.toString());

        await Promise.all(
            recipients.map(recipient =>
                sendNotificationService(NOTIFICATION_EVENTS.message_received, recipient, {
                    title: NOTIFICATION_TITLE.message_received,
                    meta: { chatId, messageId: messageRes._id }
                })
            )
        );
    };

    const readLatest = async ()=>{
        await readService(socket.data.currentChat._id,socket.data.user._id);
    }

    const updateMessage = async(data)=>{
        const {messageId, content} = data;
        await updateMessageService(data);
        
        gateway.emitToChat("chat:updated", {messageId,content});
        gateway.emitToSocket("chat:updated", data);
    }

    const deleteMessage = async({messageId}) => {
        const messageRes = await deleteMessageService(messageId);

        gateway.emitToChat("chat:deleted", messageRes); 
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