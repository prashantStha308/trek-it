"use client"

import { useGetPackageById } from "@/queries/package.queries";
import { optimizeImageUrl } from "@/utils/utils.helper";
import Image from "next/image";
import { useParams } from "next/navigation";


function Badge({ children, variant = "default" }) {
    const variants = {
        default: "bg-stone-100 text-stone-700 dark:bg-neutral-800 dark:text-neutral-300",
        green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
        red: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        blue: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${variants[variant]}`}>
            {children}
        </span>
    );
}


function BookingCard({pkg}) {
    return (
        <section
            className="border border-border rounded-xl p-4 flex flex-col sticky left-5 top-15 w-md "
        >
            <header
                className="w-full h-44 rounded-t-xl bg-primary/45"
            >
                {pkg.name}
            </header>
            

        </section>
    )
}

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