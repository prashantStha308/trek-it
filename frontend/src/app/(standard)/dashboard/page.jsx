"use client";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/queries/auth.query";
import { showToast } from "@/store/ui.store";
import { useEffect } from "react";
import GuideDashboard from "./guide/GuideDashboard";
import TouristDashboard from "./tourist/TouristDashboard";
import AdminDashboard from "./admin/AdminDashboard";

function getUserDashboard(user) {
    switch (user.role) {
        case "guide":
            return <GuideDashboard user={user} />;
        case "tourist":
            return <TouristDashboard user={user} />;
        case "admin":
            return <AdminDashboard user={user} />;
        default:
            return null;
    }
}

export default function DashboardPage() {
    const { data: user, isLoading } = useGetMe();
    const router = useRouter();

    const dashboard = user ? getUserDashboard(user) : null;

    useEffect(() => {
        if (isLoading) return;
        if (!user) {
            router.replace("/login");
            return;
        }
        if (!dashboard) {
            showToast({ title: "Error occurred", message: "Invalid role" });
            router.replace("/");
        }
    }, [user, isLoading, dashboard, router]);

    if (isLoading) return "Loading...";
    if (!dashboard) return null;

    return dashboard;
}
