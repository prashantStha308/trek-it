"use client";
import { useGetMe } from "@/queries/auth.query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RoleGuard({ children, roles = [] }) {
    const { data: user, isLoading } = useGetMe();
    const router = useRouter();

    const isAllowed =
        !!user && (roles.length === 0 || roles.includes(user.role));

    useEffect(() => {
        if (isLoading) return;
        if (!isAllowed) router.replace("/");
    }, [isLoading, isAllowed, router]);

    if (isLoading) return "Loading...";
    if (!isAllowed) return null;

    return children;
}
