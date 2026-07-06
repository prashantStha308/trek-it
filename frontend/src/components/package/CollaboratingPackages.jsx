"use client";

import { Handshake } from "lucide-react";
import {
    useGetCollaboratingPackages,
    useGetGuideCollaboratingPackages,
} from "@/queries/collaboration.query";
import PackageDetailedCard from "@/components/package/PackageDetailedCard";
import PackageCardSkeleton from "@/components/loaders/PackageCardSkeleton";
import EmptySection from "@/components/layout/EmptySection";

export default function CollaboratingPackages({ guideId = null }) {
    const loggedInGuideQuery = useGetCollaboratingPackages({
        enabled: !guideId,
    });

    const specificGuideQuery = useGetGuideCollaboratingPackages(guideId, {
        enabled: !!guideId,
    });

    const { data: collaboratingPackages, isLoading } = guideId
        ? specificGuideQuery
        : loggedInGuideQuery;

    const hasPackages = collaboratingPackages?.length > 0;

    if (!isLoading && !hasPackages) return null;

    return (
        <section id="collaborating-packages" className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
                <Handshake size={20} className="text-primary" />
                <h2 className="text-xl text-primary font-semibold">
                    Collaborating Packages
                </h2>
                {hasPackages && (
                    <span className="text-sm text-text/50">
                        ({collaboratingPackages.length})
                    </span>
                )}
            </div>

            {isLoading ? (
                <div className="flex flex-col gap-2.5">
                    {[1, 2].map((skeletonIndex) => (
                        <PackageCardSkeleton key={skeletonIndex} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    {collaboratingPackages.map((collaboratingPackage) => (
                        <PackageDetailedCard
                            key={collaboratingPackage._id}
                            item={collaboratingPackage}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}