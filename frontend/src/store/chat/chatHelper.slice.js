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

})