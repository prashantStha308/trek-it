import {
    getChatMessages
} from "@/api/chat.api.js";

export const chatHelperSlice = (set, get) => ({
    /**
     * @description - Appends a message to the messages array for a given chat. Creates the array if it does not exist yet.
     * @param {String} chatId  - The chat the message belongs to
     * @param {Object} message - The message object to append
     */
    addMessage: (chatId, message) => {
        set(state => ({
            messages: {
                ...state.messages,
                [chatId]: [
                    ...(state.messages[chatId] || []),
                    message
                ]
            }
        }));
    },


    setLastMessage: (chatId, message) => {
    console.log("setLastMessage called", chatId, message);

        set(state => {
            const existingChat = state.chats[chatId];
            if (!existingChat) return state;
            return {
                chats: {
                    ...state.chats,
                    [chatId]: {
                        ...existingChat,
                        lastMessage: message
                    }
                }
            };
        });
    },
    /**
     * @description - Increments the unread message count for a given chat. Initialises to 1 if no count exists yet.
     * @param {String} chatId - The chat whose count should be incremented
     */
    incrementNewMessageCount: (chatId) => {
        set(state => ({
            newMessageCount: {
                ...state.newMessageCount,
                [chatId]: state.newMessageCount[chatId] <= 0 ? 1 : state.newMessageCount[chatId] + 1
            }
        }));
    },

    /**
     * @description - Lazily loads messages for a chat room from the REST API. Skips the fetch if messages for that room are already in the store.
     * @param {String} chatId - The chat whose messages should be loaded
     */
    loadMessages: async (chatId) => {
        const res = await getChatMessages(chatId, { limit: 30, page: 1 });
        const msgs = [...res.docs].reverse();
        set(state => ({
            messages: { ...state.messages, [chatId]: msgs }
        }));
    },
})