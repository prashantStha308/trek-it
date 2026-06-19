import AuthGuard from "@/components/auth/AuthGuard";

export default function ChatLayout({ children }) {
  return (
    <AuthGuard>
      <div className="h-screen flex flex-col">
        <main className="flex-1 overflow-hidden ">{children}</main>
      </div>
    </AuthGuard>
  );
}
