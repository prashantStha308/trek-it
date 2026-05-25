"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import { MapPin, Tag, Star, ShieldAlert, ShieldCheck, Calendar, Users } from "lucide-react";
import { useGetPackageById } from "@/queries/package.query";
import { optimizeImageUrl } from "@/utils/utils.helper";
import Badge from "@/components/ui/Badge";
import BookingCard from "@/components/booking/BookingCard";
import BreadCrumbs from "@/components/package/BreadCrumbs";

import PackageHero from "@/components/package/PackageHero";
import TripDetailsCard from "@/components/package/TripDetailsCard";

import Card from "@/components/layout/Card";


function MainContent({ data }) {
    return (
        <div className="flex-1 flex flex-col gap-4 min-w-0">
            <Card title="Description">
                <p className="text-text/70 text-sm leading-relaxed">
                    {data?.description || "No description provided."}
                </p>
            </Card>

            <TripDetailsCard data={data} />
            <ActivitiesCard activities={data?.activities} />
            <GuideCard guide={data?.guide} />
        </div>
    );
}


function ActivitiesCard({ activities }) {
    if (!activities?.length) return null;
    return (
        <Card title="Activities">
            <div className="flex flex-wrap gap-2">
                {activities?.map((a) => (
                    <span key={a} className="text-xs capitalize border border-border px-3 py-1 rounded-full text-text/70">
                        {a}
                    </span>
                ))}
            </div>
        </Card>
    );
}

function GuideCard({ guide }) {
    if (!guide) return null;
    const initials = guide?.name.split(" ").map((n) => n[0]).join("").toUpperCase();
    return (
        <Card title="Your guide">
            <div className="flex items-center gap-3">
                {guide?.profilePicture ? (
                    <Image
                        src={guide?.profilePicture?.src}
                        alt={guide?.name}
                        width={300}
                        height={300}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                        {initials}
                    </div>
                )}
                <div>
                    <p className="text-sm font-medium text-text">{guide?.name}</p>
                    <p className="text-xs text-text/50 capitalize">{guide?.gender}</p>
                </div>
            </div>
        </Card>
    );
}


export default function PackagePage() {
    const { packageId } = useParams();
    const { data, isLoading } = useGetPackageById(packageId);

    if (isLoading) return <p className="p-8 text-text/60">Loading...</p>;

    const heroSrc = optimizeImageUrl(data?.thumbnail, 1080);

    return (
        <section className="flex flex-col gap-6 px-4 pb-12">
            <PackageHero data={data} heroSrc={heroSrc} />
            
            <BreadCrumbs stops={data?.regions} />
            
            <div className="flex gap-8 items-start">
                <MainContent data={data} />
                <BookingCard pkg={data} />
            </div>
        </section>
    );
}