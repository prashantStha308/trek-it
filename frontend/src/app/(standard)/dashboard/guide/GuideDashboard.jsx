"use client";

import { useGetMe } from "@/queries/auth.query";

import UserBookings from "@/components/dashboard/UserBookings";
import DashboardHero from "@/components/dashboard/DasboardHero";
import RoleGuard from "@/components/auth/RoleGuard";
export default function GuideDashboard({ user }) {
    return (
        <RoleGuard roles={["guide"]}>
            <section>
                <DashboardHero user={user} />
                <UserBookings user={user} />
            </section>
        </RoleGuard>
    );
}