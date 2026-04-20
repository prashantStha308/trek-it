import useSocketStore from "../socket.store";


const middleware = (func, data) => {
    return (state) => {
        func(state, data)
    }
}

export const chatEventsSlice = (set, get) => ({
    registerChatEvents: () => {
        const { on } = useSocketStore.getState();

        const listeners = [
            on("chat:joined", (data) => set(state => ({
                chats: { ...state.chats, [data._id]: { ...data } },
                activeChatId: data._id
            }))),

            on("chat:userJoined", (data) => {
                // add new joined user to chat
                set(state => ({
                    chats: {
                        ...state.chats,
                        [data.chatId]: {
                            ...state.chats[data.chatId],
                            participants: [
                                ...state.chats[data.chatId].participants,
                                data.user
                            ]
                        }
                    }
                }))

                // if user received the userJoined event when not in the said chatId, increment the newMessageCount
                if (data.chat !== get().activeChatId) {
                    get().incrementNewMessageCount(data.chat)
                }

            }),

            on("chat:messageReceived", (message) => get().addMessage(message.chat, message)),
            on("chat:messageSent", (message) => get().addMessage(message.chat, message)),

            on("chat:messageUpdated", (message) => {
                set(state => {
                    const chatId = message.chat;

                    return {
                        // update received message
                        messages: {
                            ...state.messages,
                            [chatId]: state.messages[chatId].map(msg =>
                                msg._id === message._id ? message : msg
                            )
                        }
                    };
                })
            }),

            on("chat:deleted", (message) => {
                set(state => {
                    const chatId = message.chat;
                    return {
                        messages: {
                            ...state.messages,
                            [chatId]: state.messages[chatId].filter(msg => msg._id !== message._id)
                        }
                    };
                })
            }),
        ];

        return () => listeners.forEach(fn => fn());
    },
})