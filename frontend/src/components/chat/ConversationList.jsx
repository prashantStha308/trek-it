

export default function ConversationList() {

    return (
        <section
            className="w-96 shrink-0 h-full flex flex-col border-r border-neutral-400 overflow-y-auto"
        >
            <header className="p-4 border-b border-neutral-200">
                {/* style later, maybe make a new component */}
                {user.name || "Some user"}
            </header>

            <section className="flex-1 flex flex-col gap-2 p-2">
                {/* make a list tile component */}
                Conversation List
            </section>

            <footer>
                user options, maybe. Maybe weill remove
            </footer>
        </section>
    )
}