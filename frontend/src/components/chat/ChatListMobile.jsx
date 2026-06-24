import { useEffect } from "react"
import {motion, AnimatePresence} from "motion/react";

import useChatStore, {toggleIsChatListActive} from "@/store/chat/chat.store";
import { useGetAllUserChats } from "@/queries/chat.query.js";

import {ListCollapse} from "lucide-react";
import NavDropdown from "../layout/NavDropdown";
import ThemeToggle from "../layout/ThemeToggle";
import ChatTile from "./ChatTile";
import { LinkButton } from "@/components/ui/Button";

import {
	PlaceholderText,
	ChatListSkeleton,
	ChatFooter,
} from "./ChatList";


const ChatHeader = () => {
    return (
        <section className="sticky top-0 left-0 right-0 bg-background z-50" >
            <header className=" bg-accent/10 dark:bg-background-dark flex items-center justify-between p-4">

            	<button
            		className="cursor-pointer text-text/75 hover:bg-secondary active:bg-secondary p-2 rounded-full"
            		onClick={toggleIsChatListActive}
            	>
            		<ListCollapse size={20} />
            	</button>

                <NavDropdown />
                <ThemeToggle />
            </header>
        </section>
    )
}

const ExpandedMobileChatList = ({isActive, chatsLoading, chatList, currentUser, activeChat})=>{
	return(
        <motion.section
			layout
			transition={{
				type: "spring",
				visualDuration: 0.3,
				bounce: 0.1
			}}
        	className={`bg-accent/10 dark:bg-background-dark ${isActive ? "w-screen px-4" : "w-0 p-0"} shrink-0 h-full flex flex-col gap-2 border-r dark:border-border/45 border-accent/15 overflow-y-auto isolate`}
        >

            <ChatHeader />
            <section className="flex-1 flex flex-col gap-2">
                {chatsLoading ? (
                    <ChatListSkeleton />
                ) : chatList.length !== 0 ? (
                    chatList.map((chat) => (
                        <ChatTile
                            key={chat._id}
                            currentUser={currentUser}
                            chat={chat}
                            isActive={chat?._id === activeChat?._id}
                        />
                    ))
                ) : (
                    <PlaceholderText currentUser={currentUser} />
                )}
            </section>
            <ChatFooter currentUser={currentUser} />
        </motion.section>
	)
}


export default function ChatListMobile({ currentUser }){
    const { data: allChats, isLoading: chatsLoading } = useGetAllUserChats();

    const chats = useChatStore(store => store.chats);
    const activeChat = useChatStore(store => store.activeChat);

    const isChatListActive = useChatStore(store => store.isChatListActive);    

    const {
    	setChats,
    } = useChatStore.getState();

    useEffect(() => {
        if (allChats?.docs) {
            // convert array to object keyed by _id so the store shape is correct
            const chatsMap = allChats.docs.reduce((acc, chat) => {
                acc[chat._id] = chat;
                return acc;
            }, {});
            setChats(chatsMap);
        }

    }, [allChats, setChats]);

    const chatList = Object.values(chats);

    return (
		<ExpandedMobileChatList
			chatsLoading={chatsLoading}
			chatList={chatList}
			currentUser={currentUser}
			activeChat={activeChat}
			isActive={isChatListActive}
		/>

    );

}