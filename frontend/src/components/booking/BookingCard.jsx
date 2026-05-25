import Image from "next/image";

import Badge from "@/components/ui/Badge";
import { optimizeImageUrl } from "@/utils/utils.helper";
import BookingForm from "./BookingForm";

export default function BookingCard({ pkg }) {
    if (!pkg) return null;

    const heroSrc = optimizeImageUrl(pkg?.thumbnail, 720);

    return (
        <aside className="w-full lg:max-w-md lg:sticky lg:top-20">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="relative h-44 bg-primary/10">
                    {heroSrc ? (
                        <Image
                            src={heroSrc}
                            alt={pkg?.name || "Package preview"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 384px"
                        />
                    ) : null}
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                        <Badge variant="blue">{pkg?.type || "package"}</Badge>
                        <h2 className="mt-3 text-lg font-semibold text-white">Book this trip</h2>
                        <p className="mt-1 text-sm text-white/85">Guide assignment happens automatically after checkout.</p>
                    </div>
                </div>

                <div className="p-4">
                    <BookingForm pkg={pkg} />
                </div>
            </div>
        </aside>
    );
}
