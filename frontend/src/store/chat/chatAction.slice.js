import useSocketStore from "../socket.store";
import {
    getOrCreateDirectChat
} from "@/api/chat.api.js";
import {
    getMessageType
} from "@/utils/chat.helper.js"


export const chatActionSlice = (set, get) => ({
    /**
     * @description - Sends message to currently active chat room
     * @param {String} content - Actual content of the message
     */
    sendMessage: (content) => {
        const { emit } = useSocketStore.getState();
        const activeChat = get().activeChat;

        if (!activeChat) {
            console.warn("sendMessage called with no active chat");
            return;
        }
        if (!content?.trim()) {
            console.warn("sendMessage called with empty content");
            return;
        }

        const obj = { content: content.trim(), type: getMessageType(content) };
        emit("chat:send", obj);
    },

    /**
     * @description - Joins a socket room and resets its unread count
     * @param {String} chatId - The chat room to switch into
     */
    switchChatRoom: (chat) => {
        console.log("Switching to chat: ", chat._id);

        const { emit } = useSocketStore.getState();

        emit("chat:join", { chatId: chat._id });
    },

    /**
     * @description - Sends a update request to server
     * @param {Object} message - Message to be updated
     * @param {String} content - content with which the message is to be updated
     */
    updateMessage: (message, content) => {
        const { emit } = useSocketStore.getState();
        let obj = { content, messageId: message._id };
        obj["type"] = getMessageType(content);
        emit("chat:update", obj);
    },

    /**
     * @description - Sends a delete request to server
     * @param {Object} message - Message to be deleted
     */
    deleteMessage: (message) => {
        const { emit } = useSocketStore.getState();
        emit("chat:delete", { messageId: message._id });
    },

    leaveChatRoom: async(chat)=>{
        const {emit} = useSocketStore.getState();
        emit("chat:leave", {chatId: chat._id})
    },

    readMessage: () => {
        /*
            1. send read all request to server.
            2. Update the last message of the chat to marked, but change UI state for every other message.
        */
        // update backend for this, create a lookup table to effectively store read states
    },

    openDirectChat: async(receipitant, onReadyCallback)=>{
        const chat = await getOrCreateDirectChat(receipitant._id);

        set(state => ({
            chats: { ...state.chats, [chat._id]: chat }
        }));
        get().switchChatRoom(chat);

        // call callback if exists
        if (onReadyCallback) onReadyCallback(chat);
    },
})