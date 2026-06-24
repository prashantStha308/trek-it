"use client"
import {useEffect, useState} from "react";

import {useGetMe} from "@/queries/auth.query.js";
import {
    useGetChatById,
} from "@/queries/chat.query.js";

import useBreakpoint from "@/hooks/useBreakpoint";

import ChatWindow from "@/components/chat/chatWindow/ChatWindow";
import ChatList from "@/components/chat/ChatList";
import ChatListMobile from "@/components/chat/ChatListMobile";

export default function Chat() {
    const {data:loggedInUser, isLoading} = useGetMe();
    const isMobile = useBreakpoint(640);

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