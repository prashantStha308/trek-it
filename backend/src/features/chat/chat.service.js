import mongoose from "mongoose";
// Models
import {Chat, Message} from "../../models/index.js";
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


export const findChatOrCreateService = async (participants = []) => {
    if (participants.length <= 0) throw new Error("participants cannot be empty");

    const chat = await Chat.findOne({
        type: "direct",
        participants: { $all: participants, $size: participants.length }
    }).populate("participants", "name profilePicture role")
    .populate("lastMessage", "_id sender receiver content createdAt");

    if (chat) return chat;

    const type = participants.length > 2 ? "group" : "direct";
    const newChat = await createChatService(participants, type);
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


export const sendMessageService = async (messageObj, chatId) => {
    if (messageObj === null || messageObj.content === null || messageObj.content.trim() === "") {
        throw new ApiError(404, "Message cannot be empty");
    }

    const [newMessage, chat] = await Promise.all([
        Message.create(messageObj),
        Chat.findById(chatId)
    ]);

    chat.lastMessage = newMessage._id;

    await Promise.all([
        chat.save(),
        newMessage.populate([
            {path: "sender", select: "_id name profilePicture"}
        ])
    ]);

    console.log("Sending Message: ", messageObj);
    return newMessage;
}


export const updateMessageService = async({messageId, content, type})=>{
    const targetMsg = await Message.findById(messageId);

    if(!targetMsg){
        throw new ApiError(404, "Message not found");
    }

    targetMsg.content = content;
    if (type) targetMsg.type = type;
    await targetMsg.save();
}

export const readService = async (chatId, userId)=>{
    await Chat.updateOne({
        _id: chatId, participants: userId
    },{
        $set:{"participants.$.lastSeen": Date.now() }
    });
}


export const joinChatService = async(chatId, userId)=>{
    if (!mongoose.Types.ObjectId.isValid(chatId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400,"Invalid chatId OR userId");
    }

    const chat = await Chat.findById(chatId)
        .populate("participants", "name profilePicture role")
        .populate("lastMessage", "_id sender receiver content createdAt");

    if(!chat) throw new ApiError(404, "Chat not found");

    const userNotInChat = !chat.participants.find((person) => person._id.toString() == userId.toString());

    if (userNotInChat) {
        await addParticipantService(userId, chatId);
    }
    console.log("Joined chat");

    return chat;
}


export const leaveChatService = async (chatId, userId) => {
    if (!mongoose.Types.ObjectId.isValid(chatId) || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid chatId OR userId");
    }

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        { $pull: { participants: userId } },
        { new: true }
    );

    if (!updatedChat) throw new ApiError(404, "Chat not found");

    // if no participants remain, delete the chat
    if (updatedChat.participants.length === 0) {
        await Chat.findByIdAndDelete(chatId);
    }

    return updatedChat.modifiedCount;
}


export const deleteMessageService = async(messageId)=>{
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new Error("Invalid messageId");
    }

    const targetMsg = await Message.findByIdAndDelete(messageId);
    if(!targetMsg) throw new ApiError(404, "Message not found");

    console.log("Deleted message");
    return targetMsg;
}

