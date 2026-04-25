export default function ChatBubble({ message, user }) {
    const isSender = message.sender._id == user._id

    return (
        <article className={`flex max-w-1/2 ${isSender ? "justify-end" : "justify-start"}`}>
            {!isSender && (
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex items-center justify-center mr-2 self-end shrink-0">
                    {message.sender.name[0]}
                </div>
            )}

            <div className={`max-w-[65%] flex flex-col ${isSender ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-2 text-sm text-text dark:text-text-dark
                    ${isSender
                        ? "bg-primary dark:bg-primary-dark/40 rounded-2xl rounded-br-sm"
                        : "bg-secondary dark:bg-secondary-dark rounded-2xl rounded-bl-sm"
                    }`}
                >
                    {message.content}
                </div>
            </div>

            {isSender && (
                <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-medium flex items-center justify-center ml-2 self-end shrink-0">
                    {user.name[0]}
                </div>
            )}
        </article>
    )
}