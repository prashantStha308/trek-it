import { useAuthStore } from "@/store/auth.store"

export default function ChatWindow() {
    return (
        <main className="flex-1 h-full flex flex-col gap-1 overflow-hidden">
            <header
                className="border-b border-neutral-300 p-4 flex"
            >
                <article>
                    Chat user info
                </article>

                <section id="buttons">

                </section>

            </header>

            <section>
                Chat Window
            </section>

        </main>
    )
}