"use client"

import { useGetPackageById } from "@/queries/package.queries";
import { optimizeImageUrl } from "@/utils/utils.helper";
import Image from "next/image";
import { useParams } from "next/navigation";

import Badge from "@/components/ui/Badge";
import BookingCard from "@/components/booking/BookingCard";


export default function PackagePage() {

    const { packageId } = useParams();
    const { data, isLoading, isPending, isError, error } = useGetPackageById(packageId);

    if (isLoading) {
        return "Loading...."
    }

    console.log(data)
    const heroSrc = optimizeImageUrl(data.thumbnail, 1080);
    
    return (
        <section
            className="flex flex-col gap-4"
        >
            {/* hero section */}
            <section
                id="package-hero"
                className="relative w-full h-[65vh] min-h-[400px] max-h-[700px] bg-stone-200 dark:bg-neutral-800"
            >
                {heroSrc && (
                    <Image
                        src={heroSrc}
                        alt={`${data.name} hero`}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                )}
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
 
                {/* Hero text */}
                <div className="absolute bottom-0 left-0 right-0 px-10 pb-8 w-full mx-auto">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {data.regions.map((r) => (
                            <span key={r} className="text-xs text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                                {r}
                            </span>
                        ))}
                        {data.keywords.map((k) => (
                            <span key={k} className="text-xs text-white/70 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full capitalize">
                                #{k}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-2">
                        {data.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 text-white/80 text-sm">
                        {data.rating > 0 && <span>★ {data.rating}</span>}
                        <span>{data.bookingCount} bookings</span>
                        {data.requiresPermit && (
                            <Badge variant="amber">Permit required</Badge>
                        )}
                        {data.verified ? (
                            <Badge variant="green">Verified</Badge>
                        ) : (
                            <Badge variant="amber">Unverified</Badge>
                        )}
                    </div>
                </div>
            </section>
            
            <section
                className="flex gap-8 justify-between items-start"
            >
                
                <section
                    className=" relative"
                >
                    {/* details */}
                    <section className="h-screen" >
asdasdasd
                    </section>
                      <section className="h-screen" >
asdasdasd
                    </section>
                </section>
                    
                <BookingCard pkg={data} />

            </section>

        </section>
    )
}