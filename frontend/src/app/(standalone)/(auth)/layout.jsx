"use client"

import AuthTransition from "@/utils/AuthTransition";
import { usePathname } from "next/navigation";

export default function AuthLayout({ children }) {
    const pathname = usePathname()

    return (
        <section
            id="auth-layout"
            className="w-screen flex items-center justify-center min-h-screen  flex justify-center items-center"
        >
            <AuthTransition routeKey={pathname}>
                <div className="border border-border rounded-xl bg-white dark:bg-secondary/15 w-[80dvw] h-fit xl:h-[90dvh] ">
                    {children}
                </div>
            </AuthTransition>
        </section>
    )
}