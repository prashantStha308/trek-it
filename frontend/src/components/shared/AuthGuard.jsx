"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetMe } from "@/queries/auth.query";

export default function AuthGuard({ children }) {

    const router = useRouter();

    const {
        data: user,
        isLoading,
        isError
    } = useGetMe();

    useEffect(() => {

        if (!isLoading && (!user || isError)) {
            router.push("/login");
        }

    }, [user, isLoading, isError, router]);

    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!user) return null;

    return children;
}