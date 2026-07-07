"use client";

import { Handshake } from "lucide-react";
import {
    useGetCollaboratingPackages,
    useGetGuideCollaboratingPackages,
} from "@/queries/collaboration.query";


import PackageDetailedCard from "@/components/package/PackageDetailedCard";
import GuidePackagesSection from "@/components/guide/profile/GuidePackagesSection";
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


    return (
        <section id="collaborating-packages" className="flex flex-col gap-5">
            <div className="flex items-center gap-3">

                <Handshake size={20} className="text-primary" />
                <h2 className="text-xl text-primary font-semibold">
                    Collaborating Packages
                </h2>

                {
                    hasPackages && (
                        <span className="text-sm text-text/50">
                            ({collaboratingPackages.length})
                        </span>
                    )
                }

            </div>

            {
                isLoading ?
                (
                    <div className="flex flex-col gap-2.5">
                        {
                            [1, 2].map((skeletonIndex) => (
                                <PackageCardSkeleton key={skeletonIndex} />
                            ))
                        }
                    </div>
                ) :
                (

                    <GuidePackagesSection packages={collaboratingPackages} />
                )
            }

        </section>
    );
}