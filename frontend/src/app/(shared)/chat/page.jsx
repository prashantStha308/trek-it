"use client"

import ChatWindow from "@/components/chat/ChatWindow";
import ConversationList from "@/components/chat/ConversationList";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Chat() {
    const isLoggedIn = useAuthStore(store => store.isLoggedIn);
    const router = useRouter();

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         // TODO: rediret to login page later
    //         router.push("/");
    //     }
    // },[isLoggedIn, router])

    return (
        <section className="h-full w-full flex gap-2">
            <ConversationList />
            <ChatWindow />
        </section>
    )
}