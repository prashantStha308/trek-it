import useSocketStore from "../socket.store";


export const chatActionSlice = (set, get) => ({
    /**
     * @description - Sends message to currently active chat room
     * @param {Object} [msg] - Message contents
     * @param {String} [msg.content] - Actual content of the message
     * @param {String} [msg.type = "text" | "file" | "link"] - type of message
     */
    sendMessage: (msg) => {
        const { emit } = useSocketStore.getState();
        emit("chat:sendMessage", msg);
    },

    switchChatRoom: (chatId) => {
        const { emit } = useSocketStore.getState();
        emit("chat:join", { chatId });

        set(state => ({
            newMessageCount: {
                ...state.newMessageCount,
                [chatId]: 0
            }
        }))
    },

    /**
     * @description - Sends a update request to sever
     * @param {Object} message - Message to be updated
     * @param {String} content - content with which the message is to be updated
     */
    updateMessage: (message, content) => {
        const { emit } = useSocketStore.getState();

        // validate ownership in backend as well
        get().validateUser(message._id);
        let obj = { content, messageId: message._id };

        const urlRegex = /(https?:\/\/[^\s]+)/g;

        if (urlRegex.test(content)) {
            obj["type"] = "link";
        } else {
            obj["type"] = "text";
        }

        emit("chat:update", obj);
    },

    deleteMessage: (message) => {
        const { emit } = useSocketStore.getState();

        get().validateUser(message._id);
        emit("chat:delete", message._id);
    },
    
    readMessage: () => {
        /*
            1. send read all request to server.
            2. Update the last message of the chat to marked, but change UI state for every other message.
        */
        // update backend for this, create a lookup table to effectively store read states
        
    },
})