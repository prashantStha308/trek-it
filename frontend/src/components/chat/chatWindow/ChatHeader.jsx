import Link from "next/link";

import { Settings } from "lucide-react";
import { Search } from "lucide-react";

export default function ChatHeader({user}) {
    return (
        <header
            className="flex justify-between p-2 px-6 bg-accent/10 dark:bg-background-dark "
        >
            <section
                id="chat-user"
                className="flex gap-4 items-center "
            >
                <div
                    className="w-10 h-10 bg-border rounded-full"
                >
                </div>

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