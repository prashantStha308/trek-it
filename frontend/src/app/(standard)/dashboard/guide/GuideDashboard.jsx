"use client";

import { useGetMe } from "@/queries/auth.query";

import UserBookings from "@/components/dashboard/UserBookings";
import DashboardHero from "@/components/dashboard/DasboardHero";
import RoleGuard from "@/components/auth/RoleGuard";

import CollabRequests from "@/components/dashboard/CollabRequests";
import CollaboratingPackages from "@/components/package/CollaboratingPackages";
import CustomRequests from "@/components/dashboard/CustomRequests";

export default function GuideDashboard({ user }) {
    return (
        <RoleGuard roles={["guide"]}>
            <section className="flex flex-col gap-20" >
                <DashboardHero user={user} />
                <UserBookings user={user} />
                <CustomRequests />
                <CollabRequests />
                <CollaboratingPackages />
            </section>
        </RoleGuard>
    );
}