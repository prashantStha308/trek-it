"use client"

import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({ children, roles = [] }) {
    const user = useAuthStore(store => store.user);
    const router = useRouter();

    const isAllowed = roles.length > 0 && roles.includes(user.role); 

    useEffect(() => {
        if (!isAllowed) {
            router.push("/");
        }
    }, [user.role]);

    if (!isAllowed) return null;

    return children;
}