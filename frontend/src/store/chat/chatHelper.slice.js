import { useAuthStore } from "../auth.store";

export const chatHelperSlice = (set, get) => ({
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

    incrementNewMessageCount: (chatId) => {
        set(state => ({
            newMessageCount: {
                ...state.newMessageCount,
                [chatId]: state.newMessageCount[chatId] <=0 ? 1 : state.newMessageCount[chatId] + 1
            }
        }))
    },

    validateUser: (messageId) => {
        const { user } = useAuthStore.getState();
        const { messages, activeChatId } = get();

        const targetMessage = messages[activeChatId].find(msg => msg._id == messageId);
        if (user._id !== targetMessage.sender._id) throw new Error("Message Cannot be updated!! You are not the owner");
    },

})