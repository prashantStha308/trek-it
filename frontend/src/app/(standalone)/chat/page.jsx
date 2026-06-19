"use client"
import {useEffect} from "react";

import ChatWindow from "@/components/chat/chatWindow/ChatWindow";
import ChatList from "@/components/chat/ChatList";
import { useState } from "react";
import {useGetMe} from "@/queries/auth.query.js";
import {
    useGetChatById,
} from "@/queries/chat.query.js";


export default function Chat() {
    const {data:loggedInUser, isLoading} = useGetMe();

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