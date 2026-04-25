import { useGetMe } from "@/queries/auth.query"
import Link from "next/link";
import NavDropdown from "../layout/NavDropdown";
import ThemeToggle from "../layout/ThemeToggle";
import ChatTile from "./ChatTile";


export default function ChatList({ chats, currentChat, messages, currentUser }) {

    const { data:user, isLoading, isPending, isError, error } = useGetMe();

    return (
        <section
            className="bg-accent/10 dark:bg-background-dark w-96 shrink-0 h-full flex flex-col gap-2 border-r dark:border-border/45 border-accent/15 overflow-y-auto px-4"
        >
            <header
                className="flex items-center justify-between p-4"
            >
                <NavDropdown />
                <ThemeToggle />
            </header>

            <section className="flex-1 flex flex-col gap-2">
                {/* make a list tile component */}
                {
                    chats.map((item, index) => (
                        <ChatTile key={index} user={item} />
                    ))
                }
            </section>

            <footer className=" border-t-8 border-background p-4 flex items-center justify-start gap-4 ">

                <div
                    className="object-cover object-center h-10 w-10 bg-accent rounded-full"
                    style={{backgroundImage: `url(${currentUser?.profilePicture?.src || ""})`}}
                ></div>

                <article className="flex flex-col gap-0.5" >
                    <h1
                        className="text-base font-medium"
                    >
                        {currentUser.name}
                    </h1>
                    <span className="capitalize text-sm font-light text-text/60" >
                        {currentUser.role}
                    </span>
                </article>
            </footer>
        </section>
    )
}