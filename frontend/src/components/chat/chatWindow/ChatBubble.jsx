import Avatar from "@/components/ui/Avatar";
import {
    EllipsisVertical,
} from "lucide-react"

import DropdownMenu from "@/components/ui/DropdownMenu";

export default function ChatBubble({ message, user }) {
    const isSender = message?.sender._id == user?._id

    return (
        <article className={`relative flex items-center gap-1 overflow-hidden max-w-full ${isSender ? "justify-end" : "justify-start"}`}>

            {
                isSender && (
                    <div className="text-text/75 p-2 opacity-30 hover:opacity-100 hover:bg-secondary/75 rounded-full cursor-pointer " >
                        <EllipsisVertical size={20} />
                    </div>
                )
            }

            <div className={`group max-w-1/2 flex flex-wrap ${isSender ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-2 text-sm text-text
                    ${isSender
                        ? "bg-primary dark:bg-primary-dark/40 rounded-2xl rounded-br-sm"
                        : "bg-secondary dark:bg-secondary-dark rounded-2xl rounded-bl-sm"
                    }`}
                >
                    {message?.content}
                </div>
            </div>


            {
                !isSender && (
                    <div className="text-text/75 p-2 opacity-30 hover:opacity-100 hover:bg-secondary/75 rounded-full cursor-pointer " >
                        <EllipsisVertical size={20} />
                    </div>
                )
            }

        </article>
    )
}