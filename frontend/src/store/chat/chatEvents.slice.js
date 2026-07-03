import useSocketStore from "../socket.store";

export const chatEventsSlice = (set, get) => ({
    registerChatEvents: () => {
        const { on } = useSocketStore.getState();

        const listeners = [
            /*
                chat:joined -- emitted back to the socket that called chat:join.
                Backend emits { chat }, not the chat object directly,
                so we destructure accordingly.
                Sets the activeChat and upserts the chat into the chats map.
            */

            on("chat:joined", (chat) => {

                console.log("hi")

                set(state => ({
                    chats: { ...state.chats, [chat._id]: { ...chat } },
                    activeChat: chat,
                    newMessageCount: {
                        ...state.newMessageCount,
                        [chat._id]: 0
                    }
                }))

                console.log("chat room joined")

            }),

            /*
                chat:userJoined -- emitted to the room when any participant joins.
                Adds the new user to that chat's participant list in the store.
                If the event is for a room the current user is not actively viewing,
                increment the unread count for that room.
            */
            on("chat:userJoined", ({chatId, user}) => {
                set(state => {
                    // chat may not be in the store yet if the user joined before the chat list was fetched, skip the update in that case
                    const existingChat = state.chats[chatId];
                    if (!existingChat) return state;

                    return {
                        chats: {
                            ...state.chats,
                            [chatId]: {
                                ...existingChat,
                                participants: [
                                    ...existingChat.participants,
                                    user
                                ]
                            }
                        }
                    };
                });

                const currentChatId = get().activeChat._id ?? null

                if (chatId !== currentChatId ) {
                    get().incrementNewMessageCount(chatId);
                }
            }),

            /*
                chat:messageReceived -- emitted to every socket in the room including the sender.
                chat:messageSent    -- emitted only back to the sender's socket.

                Since the backend emits both to the sender, listening to both would double-add the sender's own messages. We listen to messageReceived for everyone else's messages, and messageSent only for the sender's own, then skip messageReceived when the sender matches the current user.
            */
            on("chat:messageReceived", (message) => {
                const activeChatId = get().activeChat?._id?.toString();
                const messageChatId = message.chat?.toString();

                // only append to messages array if actively viewing this chat
                // if away, the REST fetch on room switch will load it fresh
                if (messageChatId === activeChatId) {
                    get().addMessage(message.chat, message);
                }

                get().setLastMessage(message.chat, message);

                if (messageChatId !== activeChatId) {
                    get().incrementNewMessageCount(message.chat);
                }
            }),

            /*
                chat:messageUpdated -- emitted to the room when a message is edited.
                Replaces the matching message in the messages array for that chat.
                Note: backend emits this as "chat:updated", align with backend if needed.
            */
            on("chat:updated", (message) => {
                set(state => {
                    const chatId = message.chat;
                    return {
                        messages: {
                            ...state.messages,
                            [chatId]: state.messages[chatId].map(msg =>
                                msg._id === message._id ? message : msg
                            )
                        }
                    };
                });
            }),

            /*
                chat:deleted -- emitted to the room when a message is deleted.
                Filters the deleted message out of the messages array for that chat.
            */
            on("chat:deleted", (message) => {
                set(state => {
                    const chatId = message.chat;
                    return {
                        messages: {
                            ...state.messages,
                            [chatId]: state.messages[chatId].filter(msg => msg._id !== message._id)
                        }
                    };
                });
            }),

            on("chat:left", (chatId)=>{
                set((state) => ({
                    chats: Object.fromEntries(
                        Object.entries(state.chats).filter(([key]) => key !== chatId)
                    ),

                    messages: Object.fromEntries(
                        Object.entries(state.messages).filter(([key]) => key !== chatId)
                    )
                }))
            }),

            on("chat:userLeft", ({chatId, userId}) => {
                set((state) => {
                    const existingChat = state.chats[chatId];
                    if (!existingChat) return state;

                    return {
                        chats: {
                            ...state.chats,
                            [chatId]: {
                                ...existingChat,
                                participants: existingChat.participants.filter(
                                    (participant) => participant._id !== userId
                                )
                            }
                        }
                    };
                });
            })

        ];

        return () => listeners.forEach(fn => fn());
    },
})