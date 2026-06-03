import Avatar from "@/components/ui/Avatar";
import {
    EllipsisVertical,
} from "lucide-react"


export default function ChatBubble({ message, user }) {
    const isSender = message?.sender._id == user?._id

    return (
        <article className={`relative flex max-w-full ${isSender ? "justify-end" : "justify-start"}`}>

            <div className={`group max-w-[65%] flex ${isSender ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-2 text-sm text-text
                    ${isSender
                        ? "bg-primary dark:bg-primary-dark/40 rounded-2xl rounded-br-sm"
                        : "bg-secondary dark:bg-secondary-dark rounded-2xl rounded-bl-sm"
                    }`}
                >
                    {message?.content}

                    {/*<span>
                        <EllipsisVertical size={10} className="text-text/75" />
                    </span>*/}
                </div>
            </div>
        </article>
    )
}