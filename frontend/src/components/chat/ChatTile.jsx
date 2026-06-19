import { getChatName, getDisplayPicture } from "@/utils/chat.helper";
import useChatStore from "@/store/chat/chat.store";
import Avatar from "@/components/ui/Avatar";

import {
    EllipsisVertical,
} from "lucide-react"

function UnreadBadge({ count }) {
    if (!count || count <= 0) return null;
    return (
        <span className=" text-xs font-medium bg-primary text-white rounded-full w-3 h-3 shrink-0" />
    );
}

export default function ChatTile({ currentUser, chat, isActive = false }) {

    const newMessageCount = useChatStore(state => state.newMessageCount[chat._id] ?? 0);
    const switchChatRoom = useChatStore(store => store.switchChatRoom);

    const displayName = getChatName(chat, currentUser);
    const displayPicture = getDisplayPicture(chat, currentUser);
    const lastMessagePreview = chat?.lastMessage?.content ?? "Say Hi 👋";


    const handleOptions = (e)=>{
        e.preventDefault();
        e.stopPropagation()
    }

    return (
        <article
            id={`chat-tile-${chat._id}`}
            onClick={() => switchChatRoom(chat)}
            className={`px-3 py-3 rounded-md cursor-pointer flex items-center gap-3 w-full transition-colors ease-out duration-70 ${isActive ? "bg-accent/15" : "bg-transparent hover:bg-accent/5"}`}
        >
            <Avatar src={displayPicture} alt={displayName} size="sm" />

            <section className="flex flex-col gap-0.5 flex-1 min-w-0">
                <h1 className="text-sm font-medium truncate">
                    {displayName}
                </h1>
                <span className="text-xs text-text/65 truncate">
                    {lastMessagePreview}
                </span>
            </section>

            <section
                className="flex flex-col justify-end items-center relative"
            >
                <button
                    className="text-text/75 p-2 cursor-pointer bg-transparent hover:bg-accent/15"
                    onClick={handleOptions}
                >
                    <EllipsisVertical size={15} />
                </button>
                <UnreadBadge count={newMessageCount} />
            </section>

        </article>
    );
}