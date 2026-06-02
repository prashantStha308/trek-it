export default function ChatTile({ user, lastMessage, notReadCount, isActive = false }) {
    console.log("inside chattile user: ", user);
    console.log("inside chattile lastMessage: ", lastMessage);
    console.log("inside chattile notReadCount: ", notReadCount);
    console.log("inside chattile isActive: ", isActive);
    console.log();

    return (
        <article
            id={`chat-tile-${user?._id || ""}`}
            className={`px-3 py-3 rounded-md ${isActive && "bg-secondary/65"} w-full flex justify-between`}
        >
            <section
                className="flex flex-col gap-1"
            >
                <h1
                    className="text-base font-medium"
                >
                    {user?.name}
                </h1>
                <span
                    className="text-xs text-text/65"
                >
                    {lastMessage || "last message"}
                </span>

            </section>

            <div>
                {/*option*/}
            </div>

        </article>
    )
}