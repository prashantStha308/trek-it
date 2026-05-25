"use client"

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function AuthGuard({ children }) {
    
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["me"]);

    const router = useRouter();

    // enable this later on

    if (!user) {
        // prompt a model to display no login error later
        router.push("/login") //create login page later
    }

    return children;
}