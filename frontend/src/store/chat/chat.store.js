import { create } from "zustand";
import { chatEventsSlice } from "./chatEvents.slice";
import { chatActionSlice } from "./chatAction.slice";
import { chatHelperSlice } from "./chatHelper.slice";

const useChatStore = create((set, get) => ({
    /*
        chats stores all chat rooms the user is a part of, keyed by chatId.
        Structure:
        chats: {
            [chatId]: {
                _id: objectId,
                type: "direct" | "group",
                participants: [ participantObj, ... ],
                createdAt: date,
                ...
            },
            [chatId]: { ... },
            ...
        }
    */
    chats: {},
    setChats: (cts) => set({ chats: cts }),

    /*
        messages stores all fetched messages for each chat room, keyed by chatId.
        Messages are loaded lazily (only when a room is first opened) and
        appended in real time via socket events after that.
        Structure:
        messages: {
            [chatId]: [
                {
                    _id: objectId,
                    chat: chatId,
                    sender: userId,
                    content: "...",
                    type: "text" | "link" | "image",
                    createdAt: date,
                },
                { ... },
                ...
            ],
            [chatId]: [ ... ],
            ...
        }
    */
    messages: {},
    setMessages: (msgs) => set({ messages: msgs }),

    /*
        activeChat tracks which chat room the user currently has open.
        null means no room is selected (e.g. on initial load or after leaving).
        This is the single source of truth for "which room am I in" --
        do not derive active room from anything else.
    */
    activeChat: null,
    setActiveChat: (id) => set({ activeChat: id }),

    /*
        newMessageCount tracks unread message counts per chat room, keyed by chatId.
        Incremented when a message arrives in a room that is not currently active.
        Reset to 0 when the user switches into that room.
        Structure:
        newMessageCount: {
            [chatId]: number,
            [chatId]: number,
            ...
        }
    */
    newMessageCount: {},

    ...chatActionSlice(set, get),
    ...chatEventsSlice(set, get),
    ...chatHelperSlice(set, get),
}));


export default useChatStore;