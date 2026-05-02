"use client"

import AuthTransition from "@/utils/AuthTransition";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }) {
    const pathname = usePathname()

    return (
        <section
            id="auth-layout"
            className="w-screen flex items-center justify-center min-h-screen h-screen max-h-screen"
        >
            <AuthTransition routeKey={pathname}>
                <div className="border border-border rounded-xl bg-secondary/15 h-[70dvh] w-dvw lg:h-[85dvh] lg:w-[70dvw]">
                    {children}
                </div>
            </AuthTransition>
        </section>
    )
}