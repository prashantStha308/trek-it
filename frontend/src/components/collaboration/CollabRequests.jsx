"use client";

import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react";
import { Handshake, CalendarX, Check, X, Undo2 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import MiniCard from "@/components/ui/MiniCard";
import Badge from "@/components/ui/Badge";
import {
    useGetCollabRequests,
    useGetMyCollabRequests,
    useAcceptCollabRequest,
    useRejectCollabRequest,
    useWithdrawCollabRequest,
} from "@/queries/collaboration.query";

const VIEWS = ["incoming", "outgoing"];

const STATUS_BADGE_MAP = {
    pending:  { label: "Pending",  color: "amber", bg: "bg-amber-400/20", border: "border-amber-400" },
    accepted: { label: "Accepted", color: "green" , bg: "bg-primary/20", border: "border-primary" },
    rejected: { label: "Rejected", color: "red", bg: "bg-red-500/20 ", border: "border-red-500" },
};

function EmptyState({ view }) {
    return (
        <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center py-16 text-text/50"
        >
            <CalendarX size={36} className="mb-3 opacity-30" />
            <p className="text-sm">
                No {view} collaboration requests
            </p>
        </motion.div>
    );
}

function CollabRequestSkeleton() {
    return (
        <div className="border border-secondary rounded-lg p-4 flex flex-col gap-3 animate-pulse">
            <div className="h-4 w-32 bg-secondary/40 rounded" />
            <div className="h-10 w-full bg-secondary/20 rounded" />
            <div className="h-3 w-48 bg-secondary/20 rounded" />
        </div>
    );
}

function IncomingRequestCard({ request }) {
    const acceptCollabRequest = useAcceptCollabRequest();
    const rejectCollabRequest = useRejectCollabRequest();
 
    const isPending = request?.status === "pending";
    const statusBadge = STATUS_BADGE_MAP[request?.status];

 
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
             className={`border ${statusBadge.border} rounded-lg overflow-hidden`}
        >
            {/* Package banner */}
            <div
                className={`flex items-center justify-between px-4 py-2 ${statusBadge.bg} border-b ${statusBadge.border}`}
            >
                <div className="flex items-center gap-2">
                    {request?.package?.thumbnail?.src && (
                        <Image
                            width={700}
                            height={450}
                            src={request.package.thumbnail.src}
                            alt={request.package.name}
                            className="w-8 h-8 rounded-md object-cover"
                        />
                    )}
                    <div className="flex flex-col">
                        <Link
                            href={`/explore/packages/${request?.package?._id}`}
                            className="text-sm font-semibold text-text hover:underline"
                        >
                            {request?.package?.name}
                        </Link>
                        <span className="text-xs text-text/50">
                            {request?.package?.regions?.join(", ")}
                        </span>
                    </div>
                </div>
                <Badge variant={statusBadge.color}>
                    {statusBadge.label}
                </Badge>
            </div>
 
            {/* Body */}
            <div className="px-4 py-3 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4">
                    <MiniCard
                        person={request?.guide}
                        subtitle="Guide"
                        options={{ border: false, star: true }}
                    />
                    {isPending && (
                        <div className="flex gap-2 shrink-0">
                            <Button
                                variant="outline"
                                color="green"
                                size="sm"
                                className="w-fit"
                                onClick={() => acceptCollabRequest?.mutate(request?._id)}
                                disabled={acceptCollabRequest?.isPending}
                            >
                                <Check size={14} />
                                Accept
                            </Button>
                            <Button
                                variant="outline"
                                color="red"
                                size="sm"
                                className="w-fit"
                                onClick={() => rejectCollabRequest?.mutate(request?._id)}
                                disabled={rejectCollabRequest?.isPending}
                            >
                                <X size={14} />
                                Reject
                            </Button>
                        </div>
                    )}
                </div>
 
                <p className="text-sm text-text/60 pl-1 border-l-2 border-secondary">
                    {request?.description}
                </p>
            </div>
        </motion.article>
    );
}
 
function OutgoingRequestCard({ request }) {
    const withdrawCollabRequest = useWithdrawCollabRequest();
 
    const isPending = request?.status === "pending";
    const statusBadge = STATUS_BADGE_MAP[request?.status];
 
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className={`border ${statusBadge.border} rounded-lg overflow-hidden`}
        >
            {/* Package banner */}
            <div
                className={`flex items-center justify-between px-4 py-2 ${statusBadge.bg} border-b ${statusBadge.border} `}>
                <div className="flex items-center gap-2">
                    {request?.package?.thumbnail?.src && (
                        <Image
                            width={700}
                            height={450}
                            src={request.package.thumbnail.src}
                            alt={request.package.name}
                            className="w-8 h-8 rounded-md object-cover"
                        />
                    )}
                    <div className="flex flex-col">
                        <Link
                            className="text-sm font-semibold text-text hover:underline"
                            href={`/explore/package/${request?.package?._id}`}
                        >
                            {request?.package?.name}
                        </Link>
                        <span className="text-xs text-text/50">
                            {request?.package?.regions?.join(", ")}
                        </span>
                    </div>
                </div>
                <Badge variant={statusBadge.color}>
                    {statusBadge.label}
                </Badge>
            </div>
 
            {/* Body */}
            <div className="px-4 py-3 flex flex-col gap-2">
 
                {isPending && (
                    <div className="flex gap-2 pt-1">
                        <Button
                            variant="outline"
                            color="red"
                            size="sm"
                            className="w-auto"
                            onClick={() => withdrawCollabRequest?.mutate(request?._id)}
                            disabled={withdrawCollabRequest?.isPending}
                        >
                            <Undo2 size={14} />
                            Withdraw
                        </Button>
                    </div>
                )}
            </div>
        </motion.article>
    );
}

export default function CollabRequests() {
    const [activeView, setActiveView] = useState("incoming");

    const { data: incomingRequestsData, isLoading: incomingLoading } = useGetCollabRequests();
    const { data: outgoingRequestsData, isLoading: outgoingLoading } = useGetMyCollabRequests();

    const incomingRequests = incomingRequestsData?.docs ?? [];
    const outgoingRequests = outgoingRequestsData?.docs ?? [];

    const isLoading = incomingLoading || outgoingLoading;

    const pendingIncomingCount = incomingRequests.filter((request) => request?.status === "pending").length;
    const pendingOutgoingCount = outgoingRequests.filter((request) => request?.status === "pending").length;

    const activeRequests = activeView === "incoming" ? incomingRequests : outgoingRequests;

    return (
        <section id="collaborations" className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
                <Handshake size={20} className="text-primary" />
                <h2 className="text-xl text-primary font-semibold">
                    Collaborations Requests
                </h2>
            </div>

            <div className="flex items-center gap-1.5">
                {
                    VIEWS.map((view) => {
                        const pendingCount = view === "incoming" ? pendingIncomingCount : pendingOutgoingCount;
                        return (
                            <Button
                                key={view}
                                variant={activeView === view ? "primary" : "outline"}
                                color="green"
                                onClick={() => setActiveView(view)}
                                className="w-auto capitalize"
                            >
                                {pendingCount > 0 ? `${view} (${pendingCount})` : view}
                            </Button>
                        );
                    })
                }
            </div>

            <section>
                {isLoading ? (
                    <div className="flex flex-col gap-2.5">
                        {[1, 2].map((skeletonIndex) => (
                            <CollabRequestSkeleton key={skeletonIndex} />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {activeRequests.length === 0 ? (
                            <EmptyState key="empty" view={activeView} />
                        ) : (
                            <motion.div
                                key={activeView}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="flex flex-col gap-2.5"
                            >
                                {activeView === "incoming"
                                    ? incomingRequests.map((request) => (
                                        <IncomingRequestCard key={request?._id} request={request} />
                                    ))
                                    : outgoingRequests.map((request) => (
                                        <OutgoingRequestCard key={request?._id} request={request} />
                                    ))
                                }
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </section>
        </section>
    );
}