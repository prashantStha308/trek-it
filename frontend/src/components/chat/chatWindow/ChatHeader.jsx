import Link from "next/link";

import {toggleIsChatListActive} from "@/store/chat/chat.store";

import {
    Settings,
    Search,
    ChevronLeft,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";


import useBreakpoint from "@/hooks/useBreakpoint";


export default function ChatHeader({user}) {
    const isMobile = useBreakpoint(640);


    return (
        <header
            className="flex justify-between p-2 px-6 bg-accent/10 dark:bg-background-dark "
        >
            <section className="flex gap-2" >
                {
                    isMobile && (
                        <button
                            className="cursor-pointer text-text/75 hover:bg-secondary active:bg-secondary p-2 rounded-full"
                            onClick = {toggleIsChatListActive}
                        >
                            <ChevronLeft />
                        </button>
                    )
                }

                <section
                    id="chat-user"
                    className="flex gap-4 items-center "
                >
                    <Avatar size={'sm'} src={user?.profilePicture?.src} />

                    <article
                        className="flex flex-col justify-start "
                    >
                        <Link
                            href={`/guide/${user?._id}`}
                            className="font-medium text-text hover:underline"
                        >
                            {user?.name}
                        </Link>
                        <h2
                            className="text-xs text-text/75 capitalize"
                        >
                            {user?.role}
                        </h2>
                    </article>

                </section>
            </section>

            
            <section
                className="flex items-center gap-8"
            >
                <button className="text-text/75 cursor-pointer" >
                    <Search size={24} />
                </button>
                
                <button className="text-text/75 cursor-pointer" >
                    <Settings size={24} />
                </button>
            </section>

        </header>
    )
}