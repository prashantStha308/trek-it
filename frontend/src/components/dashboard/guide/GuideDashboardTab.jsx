"use client";

import {
    CalendarDays,
    Handshake,
    Backpack,
    Package,
} from "lucide-react";

import DashboardTabs from "./DashboardTabs";

import UserBookings from "../UserBookings";
import CollabRequests from "@/components/collaboration/CollabRequests";
import CollaboratingPackages from "@/components/collaboration/CollaboratingPackages";
import DashboardGuidePackages from "@/components/dashboard/guide/DashboardGuidePackages";


export default function GuideDashboardTab({ user }) {
    const tabs = [
        {
            id: "bookings",
            label: "Bookings",
            icon: CalendarDays,
            content: <UserBookings user={user} />,
        },
        {
            id: "ownPackage",
            label: "Packages",
            icon: Package,
            content: <DashboardGuidePackages />,
        },
        {
            id: "requests",
            label: "Requests",
            icon: Handshake,
            content: <CollabRequests />,
        },
        {
            id: "packages",
            label: "Collaborations",
            icon: Backpack,
            content: <CollaboratingPackages />,
        },

    ];

    return (
        <DashboardTabs
            tabs={tabs}
            defaultTab="bookings"
            layoutId="guide-dashboard-tab"
        />
    );
}