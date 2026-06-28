"use client"
import {useEffect} from "react";

import {useGetMe} from "@/queries/auth.query.js";
import {
    useGetChatById,
} from "@/queries/chat.query.js";

import useBreakpoint from "@/hooks/useBreakpoint";
import useChatStore from "@/store/chat/chat.store";

import ChatWindow from "@/components/chat/chatWindow/ChatWindow";
import ChatList from "@/components/chat/ChatList";
import ChatListMobile from "@/components/chat/ChatListMobile";

export default function Chat() {
    const {data:loggedInUser, isLoading} = useGetMe();
    const isMobile = useBreakpoint(640);

    const {setActiveChat} = useChatStore.getState();

    useEffect(()=>{

        return ()=> setActiveChat(null);
    }, [setActiveChat])

    return (
        <section className="h-full w-full flex">
            {
                !isMobile ? (
                    <ChatList currentUser={loggedInUser} />
                ) : (
                    <ChatListMobile currentUser={loggedInUser} />
                )
            }
            <ChatWindow currentUser={loggedInUser} />
        </section>
    )
}