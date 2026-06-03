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
        console.log(
            `JOIN REQUEST: ${socket.id} -> ${chatId}`
        );


        const user = socket.data.user;        
        const chat = await joinChatService(chatId, user._id);

        gateway.joinChat(chat);
        gateway.emitToSocket("chat:joined", chat);
        gateway.emitToChat("chat:userJoined", {chatId: chat._id, user});
    };

    const leave = async ({chatId}) => {
        await leaveChatService( chatId, socket.data.user._id );

        gateway.leaveChat();
        gateway.emitToSocket("chat:left", chatId);
        gateway.emitToChat("chat:userLeft", {chatId, userId: socket.data.user._id});
    }

    const createChat = async (data) => {
        let { participants=[], type = "direct" } = data;

		if (!participants.every(id => mongoose.Types.ObjectId.isValid(id))) {
		    throw new Error("Invalid participant");
        }
        
        participants = [...participants, socket.data.user._id];

        const chat = await createChatService(participants,type);

        gateway.joinChat(chat);
        gateway.emitToSocket("chat:created", { chat });

        // handle notification
    }

    const sendMessage = async (messageData) => {
        
        console.log(
            "SEND MESSAGE FROM",
            socket.data.user._id.toString(),
            "ROOM",
            socket.data.currentChat?._id
        );
        // Validate messageData Object
        validateObject(messageData, ["content", "type"]);

        // Get participants
        const userId = socket.data.user._id;
        const chatId = socket.data.currentChat._id;

        if (!chatId) throw new ApiError(400, "Not in a chat");
        
        // Construct message obj
        const message = {
            chat: chatId,
            sender: userId,
            ...messageData
        }
        // send message
        const messageRes = await sendMessageService(message, chatId);

        gateway.emitToSocket("chat:messageSent", messageRes);
        gateway.emitToChat("chat:messageReceived", messageRes);
        gateway.emitToChat("chat:newMessage", messageRes);

        // handle sending notifications to other users

        const recipients = socket.data.currentChat.participants
            .filter(p => p.toString() !== userId.toString());

        await Promise.all(
            recipients.map(recipient =>
                sendNotificationService(NOTIFICATION_EVENTS.messageReceived, recipient, {
                    title: NOTIFICATION_TITLE.messageReceived,
                    meta: { chatId, messageId: messageRes._id }
                })
            )
        );
    }

    const readLatest = async ()=>{
        await readService(socket.data.currentChat._id,socket.data.user._id);
    }

    const updateMessage = async(data)=>{
        const { messageId, content, type } = data;
        // TODO: Authorization
        await updateMessageService(data);
        
        gateway.emitToChat("chat:updated", data);
        gateway.emitToSocket("chat:updated", data);
    }

    const deleteMessage = async({messageId}) => {
        const messageRes = await deleteMessageService(messageId);

        gateway.emitToChat("chat:deleted", messageRes); 
    }

    return {
    	join,leave,
    	createChat,
        sendMessage,
        readLatest,
        updateMessage, deleteMessage,
    };
}

export default chatHandler;