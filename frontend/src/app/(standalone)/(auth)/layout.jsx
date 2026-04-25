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
            <AuthTransition key={pathname}>
                <div className="border border-border rounded-xl bg-secondary/15">
                    {children}
                </div>
            </AuthTransition>
        </section>
    )
}