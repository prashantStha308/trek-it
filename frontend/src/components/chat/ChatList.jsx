import {useEffect} from "react"
import Link from "next/link";

import { useGetMe } from "@/queries/auth.query"
import NavDropdown from "../layout/NavDropdown";
import ThemeToggle from "../layout/ThemeToggle";
import ChatTile from "./ChatTile";
import useChatStore from "@/store/chat/chat.store";
import {
    useGetAllUserChats,
    useGetChatById,
} from "@/queries/chat.query.js";
import {LinkButton} from "@/components/ui/Button";


function ChatHeader(){
    return (
        <header
            className="flex items-center justify-between p-4"
        >
            <NavDropdown />
            <ThemeToggle />
        </header>
    )
}

function ChatFooter({currentUser}){
    return (
        <footer className=" border-t-8 border-background p-4 flex items-center justify-start gap-4 ">

            <div
                className="object-cover object-center h-10 w-10 bg-accent rounded-full"
                style={{backgroundImage: `url(${currentUser?.profilePicture?.src || ""})`}}
            ></div>

            <article className="flex flex-col" >
                <span
                    className="text-base font-medium leading-tight"
                >
                    {currentUser?.name}
                </span>
                <span className="capitalize text-xs font-light text-text/60" >
                    {currentUser?.role}
                </span>
            </article>
        </footer>
    )
}


function ChatListSkeleton() {
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

function PlaceHolderText({currentUser}){
    return(
        <section className="h-full flex flex-col gap-4 items-center justify-center w-full" >
            {
                currentUser?.role === "tourist" ? (
                    <>
                        <h1 className="text-3xl font-bold text-primary text-center" >Start a conversation with a guide</h1>

                        <LinkButton href={"/explore?tab=guide"} color={"blue"} variant="primary" size="md" >
                                Explore guides
                        </LinkButton>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold text-primary text-center" >
                        Your conversation will appear here.
                    </h1>
                )
            }
        </section>
    )
}


export default function ChatList() {

    const { data: currentUser, isLoading, isPending, isError, error } = useGetMe();
    const { data: allChats, isLoading: chatsLoading, isError: isAllChatError, error: allChatError } = useGetAllUserChats();

    const chats = useChatStore(store => store.chats);
    const activeChatId = useChatStore(store => store.activeChatId);

    const setChats = useChatStore( store => store.setChats );

    useEffect(()=>{
        if(allChats){
            setChats(allChats)
        }

        return ()=> setChats([])
    }, [allChats, setChats])


    const chatKeys = Object.keys(chats);

    return (
        <section className="bg-accent/10 dark:bg-background-dark w-96 shrink-0 h-full flex flex-col gap-2 border-r dark:border-border/45 border-accent/15 overflow-y-auto px-4">
            <ChatHeader />
            <section className="flex-1 flex flex-col gap-2">
                {chatsLoading ? (
                    <ChatListSkeleton />
                ) : chatKeys.length !== 0 ? (
                    chatKeys.map((key) => (
                        <ChatTile key={key} chat={chats[key]} />
                    ))
                ) : (
                    <PlaceHolderText currentUser={currentUser} />
                )}
            </section>
            <ChatFooter currentUser={currentUser} />
        </section>
    );
}