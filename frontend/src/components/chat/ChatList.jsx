import { useEffect } from "react"
import {useRouter} from "next/navigation";

import NavDropdown from "../layout/NavDropdown";
import ThemeToggle from "../layout/ThemeToggle";
import ChatTile from "./ChatTile";
import useChatStore from "@/store/chat/chat.store";
import { useGetAllUserChats } from "@/queries/chat.query.js";
import { LinkButton, Button } from "@/components/ui/Button";

export const ChatHeader = () => {
    return (
        <section className="sticky top-0 left-0 right-0 bg-background z-50" >
            <header className=" bg-accent/10 dark:bg-background-dark flex items-center justify-between p-4">
                <NavDropdown />
                <ThemeToggle />
            </header>
        </section>
    )
}

export const ChatFooter = ({ currentUser }) => {
    return (
        <footer className="sticky bottom-0 left-0 right-0 bg-background border-t-4 border-background p-4 flex items-center justify-start gap-4">
            <div
                className="object-cover object-center h-10 w-10 bg-accent rounded-full"
                style={{ backgroundImage: `url(${currentUser?.profilePicture?.src || ""})` }}
            />
            <article className="flex flex-col">
                <span className="text-base font-medium leading-tight">
                    {currentUser?.name}
                </span>
                <span className="capitalize text-xs font-light text-text/60">
                    {currentUser?.role}
                </span>
            </article>
        </footer>
    )
}

export const ChatListSkeleton = () => {
    return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-2 py-3 rounded-xl animate-pulse">
                    <div className="w-10 h-10 rounded-full bg-accent/20 shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                        <div className="h-3 w-32 bg-accent/20 rounded-full" />
                        <div className="h-2.5 w-48 bg-accent/10 rounded-full" />
                    </div>
                    <div className="h-2.5 w-8 bg-accent/10 rounded-full self-start mt-1" />
                </div>
            ))}
        </div>
    );
}

export const PlaceholderText = ({ currentUser }) => {

    const router = useRouter();

    const handleGoBack = ()=>{
        router.back();
    }

    return (
        <section className="h-full flex flex-col gap-4 items-center justify-center w-full">
            {currentUser?.role === "tourist" ? (
                <>
                    <h1 className="text-3xl font-bold text-primary text-center">
                        Start a conversation with a guide
                    </h1>
                    <LinkButton href={"/explore?tab=guide"} color={"blue"} variant="primary" size="md">
                        Explore guides
                    </LinkButton>
                </>
            ) : (
                <div className="flex flex-col items-center gap-4" >
                    <h1 className="text-3xl font-bold text-primary text-center">
                        Your conversations will appear here.
                    </h1>

                    <Button
                        size={"md"}
                        color={"blue"}
                        variant={"primary"}
                        className="w-fit"
                        onClick={handleGoBack}
                    >
                        Go back
                    </Button>
                </div>
            )}
        </section>
    )
}

export default function ChatList({currentUser}) {
    const { data: allChats, isLoading: chatsLoading } = useGetAllUserChats();

    const chats = useChatStore(store => store.chats);
    const activeChat = useChatStore(store => store.activeChat);
    const setChats = useChatStore(store => store.setChats);

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
        <section className="bg-accent/10 dark:bg-background-dark w-96 shrink-0 h-full flex flex-col gap-2 border-r dark:border-border/45 border-accent/15 overflow-y-auto px-4 isolate resize-x ">
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
        </section>
    );
}