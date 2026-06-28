"use client";
import { useGetMe } from "@/queries/auth.query";

import UserBookings from "@/components/dashboard/UserBookings";
import DashboardHero from "@/components/dashboard/DasboardHero";
import RoleGuard from "@/components/auth/RoleGuard";

export default function Dashboard({ user }) {
    return (
        <RoleGuard roles={["tourist", "guide"]}>
            <section className="px-20 flex flex-col gap-20 ">
                <DashboardHero user={user} />
                <UserBookings user={user} />
            </section>
        </RoleGuard>
    );
}
