import Image from "next/image";
import {
	MapPin,
	Tag,
	Star
} from "lucide-react";
import Badge from "@/components/ui/Badge";


function HeroTags({ regions, keywords }) {
    return (
        <div className="flex flex-wrap gap-2 mb-3 cursor-pointer">
            {regions.map((region) => (
                <span key={region} className="flex items-center gap-1 text-xs text-white/90 bg-accent/10 hover:bg-accent/25 backdrop-blur-sm border border-primary/20 px-3 py-1 rounded-md">
                    <MapPin size={11} /> {region}
                </span>
            ))}
            {keywords.map((keyword) => (
                <span key={keyword} className="flex items-center gap-1 text-xs text-white/65 bg-accent/10 hover:bg-accent/25 backdrop-blur-sm border border-primary/10 px-3 py-1 rounded-md capitalize">
                    <Tag size={11} /> {keyword}
                </span>
            ))}
        </div>
    );
}

function HeroMeta({ data }) {
    return (
        <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm">
            {data?.rating > 0 && (
                <span className="flex items-center gap-1">
                    <Star size={13} fill="currentColor" /> {data?.rating}
                </span>
            )}
            <span>{data?.bookingCount} bookings</span>
            {data?.requiresPermit && <Badge variant="amber">Permit required</Badge>}
            {data?.verified
                ? <Badge variant="green">Verified</Badge>
                : <Badge variant="amber">Unverified</Badge>
            }
        </div>
    );
}

export default function PackageHero({ data, heroSrc }) {
    return (
        <section className="relative w-full h-[65vh] min-h-100 max-h-175 rounded-lg overflow-hidden bg-stone-200 dark:bg-neutral-800">
            {heroSrc && (
                <Image
                    src={heroSrc}
                    alt={`${data?.name} hero`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-10 pb-8">
                <HeroTags regions={data?.regions} keywords={data?.keywords} />

                <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
                    {data?.name}
                </h1>
                <HeroMeta data={data} />
            </div>
        </section>
    );
}