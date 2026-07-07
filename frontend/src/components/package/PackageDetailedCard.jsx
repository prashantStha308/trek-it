import Image from "next/image";
import { Calendar, MapPin, ShieldCheck, ShieldAlert, Users } from "lucide-react";

import { optimizeImageUrl } from "@/utils/utils.helper";
import { LinkButton } from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

function BadgeRow({ items = [], variant = "green", limit = 4 }) {
    if (!items?.length) return null;

    return (
        <div className="flex items-center flex-wrap gap-1">
            {items.slice(0, limit).map((itm, index) => (
                <Badge key={index} size="sm" variant={variant}>
                    {itm}
                </Badge>
            ))}
            {items.length > limit && (
                <Badge size="sm" variant={variant}>
                    +{items.length - limit}
                </Badge>
            )}
        </div>
    );
}

export default function PackageDetailedCard({ item, me }) {
    const stopCount = item?.stops?.length || 0;

    return (
        <article className="w-lg bg-secondary/16 rounded-xl border border-black/10 overflow-hidden flex flex-col">

            <div className="relative w-full h-44  shrink-0 bg-black/15">
                <Image
                    src={optimizeImageUrl(item?.thumbnail?.src ?? item?.thumbnail, 800) || "/assets/svg/placeholder-white.svg"}
                    alt={item?.name}
                    fill
                    className="object-cover"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/45 text-white text-xs px-3 py-0.5 rounded-full">
                    {item?.daysAlloted} days
                </span>
                {item?.verified && (
                    <span className="absolute top-2.5 left-2.5 bg-primary text-white text-xs flex items-center gap-1 px-2.5 py-0.5 rounded-full">
                        <ShieldCheck size={12} />
                        Verified
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col gap-3 flex-1">

                <div className="flex justify-between items-start gap-2">
                    <p className="text-base font-medium text-text leading-snug">
                        {item?.name}
                    </p>
                </div>

                <p className="text-sm text-text/70 line-clamp-2">
                    {item?.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-text/75">
                    <span className="flex items-center gap-1">
                        <Users size={13} />
                        {item?.minGroupSize}-{item?.maxGroupSize} people
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {item?.daysAlloted} days
                    </span>
                    {stopCount > 0 && (
                        <span className="flex items-center gap-1">
                            <MapPin size={13} />
                            {stopCount} stops
                        </span>
                    )}
                    <span className="font-medium text-text">
                        NRS. {item?.pricePerPerson} / person
                    </span>
                </div>

                <BadgeRow variant="green" items={item?.activities} />
                <BadgeRow variant="blue" items={item?.regions} />
                <BadgeRow variant="default" items={item?.keywords} limit={3} />

                {item?.requiresPermit && (
                    <div className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-500">
                        <ShieldAlert size={13} className="shrink-0 mt-0.5" />
                        <span>
                            Permit required{item?.permitDetails ? `: ${item.permitDetails}` : ""}
                        </span>
                    </div>
                )}

                <div className="flex flex-row-reverse justify-between pt-2 border-t border-text/15" >
                    <div className=" pt-3 gap-4 flex justify-end">
                        {
                            (me && me?._id === item?.guide?._id) && (
                                <LinkButton
                                    href={`/explore/packages/${item?._id}/edit`}
                                    variant="primary"
                                    color={"blue"}
                                    size="md"
                                >
                                    Edit Package
                                </LinkButton>

                            )
                        }

                        <LinkButton
                            href={`/explore/packages/${item?._id}`}
                            variant="primary"
                            size="md"
                        >
                            View Package
                        </LinkButton>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                        <p className="text-xs text-text/65">Starting from</p>
                        <p className="text-base font-medium text-text">
                            NRS. {item?.startingPrice}
                        </p>
                    </div>
                </div>

            </div>
        </article>
    );
}