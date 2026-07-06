"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetMe } from "@/queries/auth.query";
import { showToast } from "@/store/ui.store.js";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetMe();

  useEffect(() => {
    if (!isLoading && (!user || isError)) {
      showToast({
        title: "Login to continue",
        message: "You must login to access this page",
      });
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
