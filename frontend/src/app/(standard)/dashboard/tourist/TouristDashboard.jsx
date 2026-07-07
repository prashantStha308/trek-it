"use client";
import { useGetMe } from "@/queries/auth.query";

import UserBookings from "@/components/dashboard/UserBookings";
import TouristDashboardHeader from "@/components/dashboard/tourist/TouristDashboardHeader";
import RoleGuard from "@/components/auth/RoleGuard";

export default function TouristDashboard({ user }) {
    return (
        <RoleGuard roles={["tourist"]}>
            <section className="px-20 flex flex-col gap-20 ">
                <TouristDashboardHeader tourist={user} />
                <UserBookings user={user} />
            </section>
        </RoleGuard>
    );
}
