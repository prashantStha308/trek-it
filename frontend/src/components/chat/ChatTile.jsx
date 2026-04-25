export default function ChatTile({ user, lastMessage, notReadCount }) {
    return (
        <article
            id={`chat-tile-${user?._id || ""}`}
            className="px-3 py-3 rounded-md bg-white/5 w-full flex justify-between"
        >
            <section
                className="flex flex-col gap-1"
            >
                <h1
                    className="text-base font-medium"
                >
                    {user.name}
                </h1>
                <span
                    className="text-xs text-text/65"
                >
                    {lastMessage || "last message"}
                </span>

            </section>

            <div>
                option
            </div>

        </article>
    )
}