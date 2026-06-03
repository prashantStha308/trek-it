import Image from "next/image";
import { Star } from "lucide-react";
import { optimizeImageUrl } from "@/utils/utils.helper";
import Link from "next/link";
import { LinkButton } from "../ui/Button";
import Badge from "@/components/ui/Badge"
import Avatar from "@/components/ui/Avatar";


export function PackageCard({ item }) {

    return (
        <article className="w-96 bg-secondary/16 rounded-xl border border-black/10 overflow-hidden">

            <div className="relative w-full h-44">
                <Image
                    src={optimizeImageUrl(item?.thumbnail, 800) || null}
                    alt={item?.name}
                    fill
                    className="object-cover"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/45 text-white text-xs px-3 py-0.5 rounded-full">
                    {item?.daysAlloted} days
                </span>
            </div>

            <div className="p-4 flex flex-col gap-3">

                <div className="flex justify-between items-start gap-2">
                    <p className="text-sm font-medium text-text leading-snug">
                        {item?.name}
                    </p>
                    <div className="flex items-center gap-1 shrink-0">
                        <Star size={12} className="fill-green-600 text-green-600" />
                        <span className="text-sm font-medium text-text">{item?.rating}</span>
                        <span className="text-xs text-text/75">({item?.bookingCount})</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Avatar src={item?.guide?.profilePicture?.src} alt={item?.guide?.name} size={"xs"} />
                    <span className="text-xs text-text/75">{item?.guide?.name}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {item?.guide?.languages.map((lang, index) => (
                        <Badge key={index} variant="green" > {lang} </Badge>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {item?.regions.map((region, index) => (
                        <Badge key={index} variant="blue" > {region} </Badge>
                    ))}
                </div>

                <div className="border-t border-black/8 pt-3 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-text/75">Starting from</p>
                        <p className="text-base font-medium text-text">
                            ${item?.startingPrice}{" "}
                        </p>
                    </div>
                    
                    <LinkButton
                        href={`/explore/packages/${item?._id}`}
                        variant="primary"
                        size="md"
                    >
                        Book Now 
                    </LinkButton>
                </div>

            </div>
        </article>
    );
}