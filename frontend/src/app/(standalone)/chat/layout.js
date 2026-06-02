import AuthGuard from "@/components/auth/AuthGuard";
import ChatSocketClient from "@/config/ChatSocketClient";

export default function ChatLayout({ children }) {
  return (
    <>
      <AuthGuard />
      <div className="h-screen flex flex-col">
        <ChatSocketClient />
        <main className="flex-1 overflow-hidden ">{children}</main>
      </div>
    </>
  );
}
