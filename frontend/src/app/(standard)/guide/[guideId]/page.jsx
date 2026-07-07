"use client"
import { useParams } from "next/navigation"

import {
    useGetGuideById
} from "@/queries/guide.query.js";

import {
    useGetGuidePackages
} from "@/queries/package.query.js"

import GuidePageHeader from "@/components/guide/profile/GuidePageHeader";
import GuidePackagesSection from "@/components/guide/profile/GuidePackagesSection";
import Reviews from "@/components/review/Reviews";

export default function GuidePage() {
    const { guideId } = useParams();
    const { data: guide, isLoading, isError, error } = useGetGuideById(guideId);
    const { data: guidePackages, isLoading:pkgLoading, isError:pkgIsError, error:pkgError } = useGetGuidePackages(guideId);

    if (isLoading) {
        return "isLoading...";
    }
    if (isError) {
        return `Error: ${error}`;
    }

    console.log("guidePackages", guidePackages)

    return (
        <section
            id="guide-preview"
            className="h-full w-full flex flex-col gap-10 px-4"
        >
            <GuidePageHeader guide={guide} />

            <section className="flex flex-col gap-4 lg:px-24">
                <h2 className="text-2xl text-primary font-semibold text-text">
                    Packages
                </h2>
                <GuidePackagesSection packages={guidePackages?.docs} />
            </section>

            <Reviews resource={guide} resourceType="guide" />
        </section>
    );
}