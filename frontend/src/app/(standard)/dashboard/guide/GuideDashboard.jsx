"use client";
import { useGetMe } from "@/queries/auth.query";

import RoleGuard from "@/components/auth/RoleGuard";

import GuideDashboardHero from "@/components/dashboard/GuideDashboardHero";
import GuideDashboardTab from "@/components/dashboard/guide/GuideDashboardTab";


export default function GuideDashboard({ user }) {
    return (
        <RoleGuard roles={["guide"]}>
            <section className="flex flex-col gap-20" >
                <GuideDashboardHero guide={user} />
                <GuideDashboardTab user={user} />
            </section>
        </RoleGuard>
    );
}