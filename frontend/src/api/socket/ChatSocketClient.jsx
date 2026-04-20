import useChatStore from "@/store/chat/chat.store";
import { useEffect } from "react";

export default function ChatSocketClient() {
    const registerChatEvents = useChatStore(store => store.registerChatEvents);

    useEffect(() => {
        const unsubscribe = registerChatEvents();

        return (() => unsubscribe())
    }, [])

    return null;
}