"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { X, Users, DollarSign } from "lucide-react";
import { AnimatePresence } from "motion/react";

import {
    useGetPackageById,
    useGetPackageCollaborators,
} from "@/queries/package.query";
import { useGetMe } from "@/queries/auth.query.js";
import { useSendCustomRequest } from "@/queries/customRequest.query.js";

import { optimizeImageUrl } from "@/utils/utils.helper";

import Badge from "@/components/ui/Badge";
import { LinkButton, Button } from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import MiniCard from "@/components/ui/MiniCard";
import ModalWrapper from "@/components/layout/ModalWrapper";
import Card from "@/components/layout/Card";
import InfoRow from "@/components/ui/InfoRow";

import Reviews from "@/components/review/Reviews";
import PackageDetails from "@/components/package/PackageDetails";
import PackageTimeLineStops from "@/components/package/PackageTimeLineStops";



function CustomizeModal({ pkg, onClose }) {
    const TREKIT_COMMISSION = 0.15;

    const minSize = pkg?.minGroupSize ?? 1;
    const maxSize = pkg?.maxGroupSize ?? 20;
    const pricePerPerson = pkg?.pricePerPerson ?? 0;

    const [groupSize, setGroupSize] = useState(minSize);
    const [description, setDescription] = useState("");

    const { mutate: sendRequest, isPending } = useSendCustomRequest();

    const subtotal = pricePerPerson * groupSize;
    const commission = subtotal * TREKIT_COMMISSION;
    const totalPrice = subtotal + commission;

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest(
            { packageId: pkg._id, groupSize, description },
            { onSuccess: onClose }
        );
    };

    return (
        <ModalWrapper>
            <div className="bg-background border border-border rounded-xl w-full max-w-md p-6 flex flex-col gap-5 shadow-xl">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-text">Customize Package</h2>
                        <p className="text-xs text-text/60 mt-0.5">{pkg?.name}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-text/50 hover:text-text transition-colors mt-0.5"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Group Size */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-text/75 uppercase tracking-wide flex items-center gap-1">
                            <Users size={12} />
                            Group Size
                        </label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setGroupSize(s => Math.max(minSize, s - 1))}
                                className="w-8 h-8 rounded-md border border-border text-text font-medium hover:bg-secondary/30 transition-colors disabled:opacity-40"
                                disabled={groupSize <= minSize}
                            >
                                −
                            </button>
                            <span className="text-text font-semibold text-lg w-8 text-center">{groupSize}</span>
                            <button
                                type="button"
                                onClick={() => setGroupSize(s => Math.min(maxSize, s + 1))}
                                className="w-8 h-8 rounded-md border border-border text-text font-medium hover:bg-secondary/30 transition-colors disabled:opacity-40"
                                disabled={groupSize >= maxSize}
                            >
                                +
                            </button>
                            <span className="text-xs text-text/50 ml-1">(max {maxSize})</span>
                        </div>
                    </div>

                    {/* Price breakdown */}
                    <Card title="Price Breakdown" border>
                        <InfoRow label="Price per person" value={`NRS ${pricePerPerson.toLocaleString()}`} />
                        <InfoRow label={`Subtotal (×${groupSize})`} value={`NRS ${subtotal.toLocaleString()}`} />
                        <InfoRow label="Service fee (15%)" value={`NRS ${commission.toLocaleString()}`} />
                        <div className="flex items-center justify-between pt-2 mt-1 border-t border-border">
                            <span className="text-xs font-semibold text-text uppercase tracking-wide">Total</span>
                            <span className="text-base font-bold text-primary">NRS {totalPrice.toLocaleString()}</span>
                        </div>
                    </Card>

                    {/* Optional message */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-text/75 uppercase tracking-wide">
                            Message to guide <span className="normal-case text-text/40">(optional)</span>
                        </label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Any specific requirements or questions for the guide..."
                            className="w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-text placeholder:text-text/40 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <Button variant="outline" color="default" onClick={onClose} className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            color="green"
                            className="flex-1"
                            disabled={isPending}
                        >
                            {isPending ? "Sending…" : "Send Request"}
                        </Button>
                    </div>

                </form>
            </div>
        </ModalWrapper>
    );
}



function PackageGuides({ pkg, currentUser }) {
    let { data: collaborators, isLoading } = useGetPackageCollaborators(pkg?._id);
    collaborators = collaborators?.docs;

    return (
        <section className="flex flex-col gap-4">
            <section className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-primary">Meet your Guides</h2>
                <MiniCard person={pkg?.guide} subtitle="Lead Guide" />
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-lg font-medium text-text">Collaborators</h2>
                <div className="text-text/60 text-xs flex flex-wrap">
                    {isLoading ? "Loading..." :
                        collaborators?.length <= 0 ? "No collaborations" :
                        collaborators?.slice(0, 4)?.map((collaborator, index) => (
                            <Link
                                key={index}
                                href={`/guide/${collaborator?._id}`}
                                className="hover:opacity-55 transition-all ease-in-out"
                            >
                                <Avatar src={collaborator?.profilePicture?.src} size="sm" />
                            </Link>
                        ))
                    }
                    {collaborators?.length > 4 && (
                        <div className="rounded-full w-6 h-6 bg-secondary">
                            +{collaborators?.length - 4}
                        </div>
                    )}
                </div>
            </section>

            {currentUser?.role === "guide" && !pkg?.collaborators?.includes(currentUser._id) && (
                <LinkButton href={`/collaborate/${pkg?._id}`} variant="outline" color="green">
                    Be a collaborator
                </LinkButton>
            )}
        </section>
    );
}



export default function PackagePage() {
    const { packageId } = useParams();
    const { data, isLoading } = useGetPackageById(packageId);
    const { data: me } = useGetMe();

    const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

    if (isLoading) return <p className="p-8 text-text/60">Loading...</p>;


    const timeLines = data?.stops?.slice(0, data?.daysAlloted)?.map((stop) => ({
        label: `Day ${stop.day}`,
        date: null,
        location: stop.nearestCity?.name,
        reason: stop.type === "other" ? (stop.customType || "Other") : stop.type,
        color: "bg-primary",
    })) || [];

    const canCustomize = me?.role === "tourist";

    return (
        <section className="flex flex-col gap-6 px-4 pb-12">

            <section
                id="package-hero"
                className="relative w-full h-96 flex flex-col-reverse items-center lg:flex-row justify-between gap-8 lg:gap-32 p-4 rounded-lg isolate"
            >
                <section className="flex flex-col gap-4">
                    <section className="flex flex-col gap-2 lg:gap-4 [&>*]:px-4 [&>*]:rounded-sm">
                        <h1 className="text-xl lg:text-3xl text-primary font-bold w-fit">
                            {data?.name}
                        </h1>

                        <article id="package-description" className="flex flex-col gap-1.5 w-lg">
                            <h2 className="text-base lg:text-xl text-white font-semibold">
                                Description
                            </h2>
                            <p className="text-sm md:text-base text-white">
                                {data?.description}
                            </p>
                        </article>
                    </section>

                    <section className="flex flex-col-reverse md:flex-row gap-4 w-fit">
                        {canCustomize && (
                            <Button
                                variant="outline"
                                color="green"
                                size="lg"
                                onClick={() => setIsCustomizeOpen(true)}
                                className="w-fit"
                            >
                                <span className="text-white">Customize this package</span>
                            </Button>
                        )}

                        <LinkButton variant="primary" href={`/booking/create/${packageId}`} size="lg">
                            Book Now!
                        </LinkButton>
                    </section>
                </section>

                {/* decorators */}
                <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/15 -z-20" />
                <div className="absolute -z-10 left-0 right-0 top-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent" />

                <div>
                    <Image
                        src={optimizeImageUrl(data?.thumbnail?.src ?? data?.thumbnail, 1080) || "/assets/svg/placeholder-white.svg"}
                        alt={data?.name}
                        className="object-cover rounded-md -z-30"
                        fill
                    />
                </div>
            </section>

            <section
                id="details"
                className="w-full flex flex-col items-start md:flex-row justify-evenly gap-16"
            >
                <div className="flex-1 flex flex-col gap-4 w-full">
                    <PackageDetails pkg={data} />
                    <PackageTimeLineStops timeLines={timeLines} />
                </div>

                <div className="w-xs">
                    <PackageGuides pkg={data} currentUser={me} />
                </div>
            </section>

            <Reviews resource={data} resourceType="package" />

            {/* Customize modal */}
            <AnimatePresence>
                {isCustomizeOpen && (
                    <CustomizeModal
                        pkg={data}
                        onClose={() => setIsCustomizeOpen(false)}
                    />
                )}
            </AnimatePresence>

        </section>
    );
}
