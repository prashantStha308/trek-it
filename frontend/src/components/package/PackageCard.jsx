import Image from "next/image";
import Link from "next/link";

import { optimizeImageUrl } from "@/utils/utils.helper";
import {THEME_COLOR} from "@/constants/theme.constants.js";

import { Star } from "lucide-react";
import { LinkButton } from "../ui/Button";
import Badge from "@/components/ui/Badge"
import Avatar from "@/components/ui/Avatar";


function BadgeRow({items = [], variant = "green"}){

    return(
        <div className="flex items-center flex-wrap gap-1">
            {
                items.length > 4 ? (
                    <>
                        {
                            items.slice(0,3).map((itm, index) => (
                                <Badge key={index} size="sm" variant={variant} > {itm} </Badge>
                            ))
                        }
                        <div className={`${THEME_COLOR[variant].badge} text-text/75 font-semibold rounded-full p-1.5 text-xs `} >
                            +{items.length - 3}
                        </div>
                    </>

                ) :(
                    items?.map((itm, index) => (
                        <Badge key={index} size="sm" variant={variant} > {itm} </Badge>
                    ))
                )
            }
        </div>
    )
}

export default function PackageCard({ item }) {

    return (
        <article className="w-xs bg-secondary/16 rounded-xl border border-black/10 overflow-hidden">

            <div className="relative w-full h-44 bg-black/15 ">
                <Image
                    src={optimizeImageUrl(item?.thumbnail?.src ?? item?.thumbnail, 800) || "/assets/svg/placeholder-white.svg"}
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

                <BadgeRow variant="green" items={item?.guide?.languages} />

                <BadgeRow variant="blue" items={item?.regions} />

{/*                <div className="flex flex-wrap gap-1">
                    {item?.guide?.languages.map((lang, index) => (
                        <Badge key={index} size="sm" variant="green" > {lang} </Badge>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1">
                    {item?.regions.map((region, index) => (
                        <Badge key={index} size="sm" variant="blue" > {region} </Badge>
                    ))}
                </div>*/}

                <div className="border-t border-black/8 pt-3 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-text/75">Starting from</p>
                        <p className="text-base font-medium text-text">
                            NRS. {item?.startingPrice}{" "}
                        </p>
                    </div>
                    
                    <LinkButton
                        href={`/explore/packages/${item?._id}`}
                        variant="primary"
                        size="md"
                    >
                        View Details 
                    </LinkButton>
                </div>

            </div>
        </article>
    );
}