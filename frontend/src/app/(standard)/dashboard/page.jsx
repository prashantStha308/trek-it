"use client";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/queries/auth.query";
import { showToast } from "@/store/ui.store";
import { useEffect } from "react";

import Dashboard from "./Dashboard";
import TouristDashboard from "./tourist/TouristDashboard";
import GuideDashboard from "./guide/GuideDashboard";
import AdminDashboard from "./admin/AdminDashboard";

function getUserDashboard(user) {

    if(user.role === "guide"){
        return <TouristDashboard user={user} />
    }
    else if( user.role === "tourist" ){
        return <GuideDashboard user={user} />
    }
    else if(user.role === "admin") {
        return <AdminDashboard user={user} />;
    }
    else{
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
