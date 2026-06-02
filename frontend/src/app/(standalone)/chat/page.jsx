"use client"

import ChatWindow from "@/components/chat/ChatWindow";
import ChatList from "@/components/chat/ChatList";
import { useState } from "react";
import {useGetMe} from "@/queries/auth.query.js";
import {
    useGetAllUserChats,
    useGetChatById,
} from "@/queries/chat.query.js";

export default function Chat() {
    const {data:loggedInUser, isLoading} = useGetMe();
    const {data:allChats, isLoading:chatsLoading, isError, error} = useGetAllUserChats();

    return (
        <section className="h-full w-full flex">
            <ChatList
                currentUser={loggedInUser}
            />
            <ChatWindow
                currentUser={loggedInUser}
            />
        </section>
    )
}