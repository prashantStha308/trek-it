import { useEffect,useRef } from "react";
import Link from "next/link";

import useChatStore, {toggleIsChatListActive} from "@/store/chat/chat.store";
import { useShallow } from "zustand/react/shallow";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatSection from "./ChatSection";
import Avatar from "@/components/ui/Avatar";
import {ListCollapse} from "lucide-react";

import {
    getReciptant
} from "@/utils/chat.helper.js";

import useBreakpoint from "@/hooks/useBreakpoint";



export default function ChatWindow({currentUser}) {
    const isMobile = useBreakpoint(640);

    const { activeChat, messages, loadMessages } = useChatStore(useShallow(store => ({
        activeChat: store.activeChat,
        messages: store.messages,
        loadMessages: store.loadMessages
    })));

    const { sendMessage } = useChatStore.getState();

    const chatMessages = messages[activeChat?._id];
    const recipitient = getReciptant(activeChat, currentUser);

    const handleSendMessage = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const msgContent = e.target.messageContent.value;

        console.log("inside handle send: ", msgContent)

        sendMessage(msgContent)

        e.target.reset();
        window.scroll({
            bottom: 0,
            behavior: 'smooth'
        })
    }

    // load messages whenever the active chat changes
    useEffect(() => {
        if (activeChat?._id) {
            loadMessages(activeChat._id);
        }
    }, [activeChat?._id]);

    return (
        <main
            id="chat-window"
            className="flex-1 h-full w-full flex flex-col justify-between gap-1 overflow-hidden"
        >
            {
                recipitient && <ChatHeader user={recipitient} />
            }

            <section
                id="messages-window"
                className="flex flex-col flex-1 p-2 overflow-hidden bg-white/5"
            >
                {
                    recipitient ? (
                        <>
                            <ChatSection
                                messages={chatMessages}
                                currentUser={currentUser}
                                recipitient = {recipitient}
                            />
                            <ChatInput onSubmit={handleSendMessage} />
                        </>
                    ) :
                    <section
                        className={`${isMobile && "relative"} text-primary flex justify-center items-center h-full w-full text-3xl font-black`}
                    >
                        {
                            isMobile && (
                                <button
                                    className=" absolute top-5 left-5 cursor-pointer text-text/75 hover:text-white hover:bg-primary active:bg-primary p-2 rounded-md border border-primary/65 "
                                    onClick={toggleIsChatListActive}
                                >
                                    <ListCollapse size={20} />
                                </button>
                            )
                        }

                        <p className="w-6/12 text-center" >
                            Select a chat to start a conversation
                        </p>
                    </section>
                }

            </section>

        </main>
    )
}