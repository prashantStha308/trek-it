import Link from "next/link";

import Avatar from "@/components/ui/Avatar";

export default function ChatSectionHeader({recipitient}){

    return (
        <section
            className="flex flex-col gap-6 items-center mt-10"
        >
            <Avatar
                src={recipitient?.profilePicture?.src}
                alt={`${recipitient?.name}'s Profile Picture`}
            />

            <article
                className="flex flex-col items-center gap-2"
            >
                <span className="text-xl font-semibold text-primary/85" >
                    {recipitient?.name}
                </span>

                <span className="text-text/75 text-sm capitalize" >
                    {recipitient?.role}
                </span>

                {
                    recipitient?.role === "guide" &&(
                        <Link
                            href={`/guide/${recipitient?._id}`}
                            className="text-sm px-4 py-1 bg-accent/75 hover:bg-accent text-white rounded-sm"
                        >
                            Vist profile
                        </Link>
                    )
                }

            </article>

            <h1 className="text-2xl font-bold text-primary/85 text-center max-w-md" >
                This is the start of your conversation
            </h1>
        </section>
    )
}
