import { useEffect, useRef } from "react"

import ChatBubble from "./ChatBubble";
import ChatSectionHeader from "./ChatSectionHeader"



export default function ChatSection({
    messages,
    currentUser,
    recipitient
}) {

    const messagesRef = useRef(null);

    useEffect(() => {
        messagesRef.current?.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [messages]);

    return (
        <section
            ref={messagesRef}
            id="messages"
            className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0 pr-3 pb-4"
        >
            <ChatSectionHeader recipitient={recipitient} />

            <section
                className="flex flex-col gap-1"
            >
                {messages?.map((message, index) => (
                    <ChatBubble
                        key={index}
                        message={message}
                        user={currentUser}
                    />
                ))}
            </section>
        </section>
    );
}