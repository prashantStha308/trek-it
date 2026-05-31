"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Clock, ArrowRight, Navigation, CalendarX, UserRound } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/Button";
import { useGetUserBookings, useGetActiveBookings } from "@/queries/booking.query";
import Avatar from "@/components/ui/Avatar";
import BookingMiniCard from "@/components/dashboard/BookingMiniCard"


const TABS = ["all", "pending", "confirmed", "completed", "cancelled"];
const CURRENT_STATUSES = ["active", "pending", "confirmed"];

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });



function MetricCard({ label, value }) {
  return (
    <div className="bg-surface rounded-xl p-4 border border-border">
      <p className="text-[11px] uppercase tracking-wide text-muted mb-1.5">{label}</p>
      <p className="text-[26px] font-semibold text-foreground leading-none">{value ?? 0}</p>
    </div>
  );
}

function BookingCardSkeleton() {
  return (
    <div className="rounded-xl border border-border p-4 animate-pulse bg-surface">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-48 bg-muted/30 rounded-lg" />
          <div className="h-3 w-32 bg-muted/20 rounded-lg" />
          <div className="h-3 w-28 bg-muted/20 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-16 bg-muted/20 rounded-full" />
          <div className="h-4 w-24 bg-muted/30 rounded-lg" />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-border flex justify-between">
        <div className="h-3 w-48 bg-muted/20 rounded-lg" />
        <div className="h-6 w-24 bg-muted/20 rounded-lg" />
      </div>
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
      <p className="text-[14px]">No {tab === "all" ? "current" : tab} bookings found</p>
    </motion.div>
  );
}

export default function UserBookings({ user }) {
  const [activeTab, setActiveTab] = useState("all");

  let { data: bookings, isLoading: bookingsLoading } = useGetUserBookings();
  let { data: activeBookings, isLoading: activeBookingLoading } = useGetActiveBookings();

  bookings = bookings?.docs;
  activeBookings = activeBookings?.docs?.filter((b) => b.status === "active");

  const isLoading = bookingsLoading || activeBookingLoading;

  const filtered =
    activeTab === "all"
      ? bookings?.filter((b) => CURRENT_STATUSES.includes(b.status))
      : bookings?.filter((b) => b.status === activeTab);

  const metrics = [
    { label: "Total bookings", value: bookings?.length },
    { label: "Active treks",   value: activeBookings?.length },
    { label: "Upcoming",       value: bookings?.filter((b) => ["confirmed", "pending"].includes(b.status)).length },
    { label: "Completed",      value: bookings?.filter((b) => b.status === "completed").length },
  ];

  return (
    <section id="booking" className="flex flex-col gap-5">
      <h2 className="text-xl text-primary font-semibold">Your Bookings</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics?.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} />
        ))}
      </div>

      {(activeBookingLoading || activeBookings?.length > 0) && (
        <section>
          <p className="text-[13px] font-medium text-success flex items-center gap-1.5 mb-3">
            <Navigation size={14} />
            Currently trekking
          </p>
          <div className="flex flex-col gap-2.5">
            {activeBookingLoading
              ? <BookingCardSkeleton />
              : activeBookings?.map((b) => <BookingMiniCard key={b._id} booking={b} />)}
          </div>
        </section>
      )}

      <div className="flex items-center gap-1.5 flex-wrap">
        {TABS.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "primary" : "default"}
            onClick={() => setActiveTab(tab)}
            className="w-auto capitalize"
          >
            {tab === "all"
              ? `Current (${bookings?.filter((b) => CURRENT_STATUSES.includes(b.status)).length ?? 0})`
              : tab}
          </Button>
        ))}
      </div>

      <section>
        {isLoading ? (
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 3 }).map((_, i) => <BookingCardSkeleton key={i} />)}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered?.length === 0 ? (
              <EmptyState key="empty" tab={activeTab} />
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="flex flex-col gap-2.5"
              >
                {filtered?.map((b) => <BookingMiniCard key={b._id} booking={b} />)}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </section>
    </section>
  );
}