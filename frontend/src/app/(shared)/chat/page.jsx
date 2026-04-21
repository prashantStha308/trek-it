"use client"

import ChatWindow from "@/components/chat/ChatWindow";
import ConversationList from "@/components/chat/ConversationList";

export default function Chat() {

    return (
        <section className="h-full w-full flex gap-2">
            <ConversationList />
            <ChatWindow />
        </section>
    )
}