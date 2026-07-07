"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Navigation,
    CalendarX,
    CalendarDays
} from "lucide-react";



import { Button } from "@/components/ui/Button";
import {
    useGetUserBookings,
    useGetActiveBookings,
} from "@/queries/booking.query";

import BookingMiniCard from "@/components/dashboard/BookingMiniCard";
import BookingCardSkeleton from "@/components/loaders/BookingCardSkeleton";


// CONSTANTS
const TABS = ["pending", "confirmed", "completed", "cancelled"];
const CURRENT_STATUSES = ["active", "pending", "confirmed"];


function MetricCard({ label, value }) {
    return (
        <div className="bg-surface rounded-lg p-4 border border-border">
            <p className="text-[11px] uppercase tracking-wide text-muted mb-1.5">
                {label}
            </p>

            <p className="text-[26px] font-semibold text-foreground leading-none">
                {value ?? 0}
            </p>
        </div>
    );
}

function EmptyState({ tab }) {
    return (
        <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center py-16 text-muted"
        >
            <CalendarX size={36} className="mb-3 opacity-30" />

            <p className="text-sm">
                No {tab === "all" ? "current" : tab} bookings found
            </p>
        </motion.div>
    );
}

export default function UserBookings() {
    const [activeTab, setActiveTab] = useState("pending");

    let { data: bookingsData, isLoading: bookingsLoading } =
        useGetUserBookings();

    let { data: activeBookingsData, isLoading: activeBookingLoading } =
        useGetActiveBookings();

    const bookings = bookingsData?.docs;

    const activeBookings = activeBookingsData?.docs?.filter(
        (booking) => booking.status === "active"
    );

    const isLoading = bookingsLoading || activeBookingLoading;

    const currentBookings = bookings?.filter((booking) =>
        CURRENT_STATUSES.includes(booking.status)
    );

    const filteredBookings = bookings?.filter((booking) => booking.status === activeTab);

    const metrics = [
        {
            label: "Total bookings",
            value: bookings?.length,
        },
        {
            label: "Active treks",
            value: activeBookings?.length,
        },
        {
            label: "Upcoming",
            value: bookings?.filter((booking) =>
                ["confirmed", "pending"].includes(booking.status)
            ).length,
        },
        {
            label: "Completed",
            value: bookings?.filter(
                (booking) => booking.status === "completed"
            ).length,
        },
    ];

    return (
        <section id="booking" className="flex flex-col gap-5">
            <h2 className="text-xl text-primary font-semibold flex gap-3 items-center">
                <CalendarDays />
                Your Bookings
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {metrics.map((metric) => (
                    <MetricCard
                        key={metric.label}
                        label={metric.label}
                        value={metric.value}
                    />
                ))}
            </div>

            {
                (activeBookingLoading || activeBookings?.length > 0) && (
                    <section>
                        <p className="text-[13px] font-medium text-success flex items-center gap-1.5 mb-3">
                            <Navigation size={14} />
                            Currently trekking
                        </p>

                        <div className="flex flex-col gap-2.5">
                            {activeBookingLoading ? (
                                <BookingCardSkeleton />
                            ) : (
                                activeBookings?.map((booking) => (
                                    <BookingMiniCard
                                        key={booking._id}
                                        booking={booking}
                                    />
                                ))
                            )}
                        </div>
                    </section>
                )
            }

            <div className="flex items-center gap-1.5 flex-wrap">
                {TABS.map((tab) => {
                    const bookingCount = bookings?.filter((booking) => booking.status === tab).length ?? 0;

                    return (
                        <Button
                            key={tab}
                            variant={activeTab === tab ? "primary" : "outline"}
                            color="green"
                            onClick={() => setActiveTab(tab)}
                            className="w-auto capitalize"
                        >
                            {
                                bookingCount > 0
                                ? `${tab} (${bookingCount})`
                                : tab
                            }
                        </Button>
                    );
                })}
            </div>

            <section>
                {
                    isLoading ? (
                        <div className="flex flex-col gap-2.5">
                            {
                                [1,2,3].map((_, index) => (
                                    <BookingCardSkeleton key={index} />
                                ))
                            }
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {
                                filteredBookings?.length === 0 ? (
                                    <EmptyState key="empty" tab={activeTab} />
                                ) : (
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{
                                            duration: 0.18,
                                            ease: "easeOut",
                                        }}
                                        className="flex flex-col gap-2.5"
                                    >
                                        {
                                            filteredBookings?.map((booking) => (
                                                <BookingMiniCard
                                                    key={booking._id}
                                                    booking={booking}
                                                />
                                            ))
                                        }
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    )
                }
            </section>
        </section>
    );
}