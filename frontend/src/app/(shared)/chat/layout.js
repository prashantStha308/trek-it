import ChatSocketClient from "@/api/socket/ChatSocketClient";
import Navbar from "@/components/layout/Navbar";

export default function ChatLayout({ children }) {
    return (
        <div className="h-screen flex flex-col">
            <ChatSocketClient />

            <Navbar />
            <main className="flex-1 overflow-hidden border-t border-neutral-400">
                {children}
            </main>
        </div>
    )
}