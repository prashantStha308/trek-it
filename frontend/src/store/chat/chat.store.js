import { create } from "zustand";
import { chatEventsSlice } from "./chatEvents.slice";
import { chatActionSlice } from "./chatAction.slice";
import { chatHelperSlice } from "./chatHelper.slice";

const useChatStore = create((set, get) => ({
    /*
        chats:{
            [chatId]:{
                _id: objectId,
                recipient: { _id, name, profilePicture, role }
                chatPicture 
            },
            [chatId]: {},
            [chatId]: {}
        }
    */
    chats: {},
    activeChatId: null,
    messages: {},

    ...chatActionSlice(set, get),
    ...chatEventsSlice(set, get),
    ...chatHelperSlice(set, get),

}));

export default useChatStore;