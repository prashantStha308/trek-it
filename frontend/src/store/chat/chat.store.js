import { create } from "zustand";
import { chatEventsSlice } from "./chatEvents.slice";
import { chatActionSlice } from "./chatAction.slice";
import { chatHelperSlice } from "./chatHelper.slice";

const useChatStore = create((set, get) => ({
    chats: {},
    activeChatId: null,
    messages: {},
    newMessageCount: {},

    ...chatActionSlice(set, get),
    ...chatEventsSlice(set, get),
    ...chatHelperSlice(set, get),

}));

export default useChatStore;