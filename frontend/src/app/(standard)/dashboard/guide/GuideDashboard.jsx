"use client";

import { useGetMe } from "@/queries/auth.query";

import UserBookings from "@/components/dashboard/UserBookings";
import GuideDashboardHero from "@/components/dashboard/GuideDashboardHero";
import RoleGuard from "@/components/auth/RoleGuard";

import CollabRequests from "@/components/collaboration/CollabRequests";
import CollaboratingPackages from "@/components/collaboration/CollaboratingPackages";

export default function GuideDashboard({ user }) {
    return (
        <RoleGuard roles={["guide"]}>
            <section className="flex flex-col gap-20" >
                <GuideDashboardHero guide={user} />
                <UserBookings user={user} />
                <CollabRequests />
                <CollaboratingPackages />
            </section>
        </RoleGuard>
    );
}