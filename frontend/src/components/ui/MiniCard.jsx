import Link from "next/link";

import { Star, BadgeCheck } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export default function MiniCard({ person, subtitle, options ={ border: true, star: true } }) {

    return (
        <section
            className={`w-full flex gap-10 justify-between items-center ${options.border && "border border-secondary"} rounded-sm px-4 py-2`}
        >
            <section className="w-full flex gap-5 justify-start items-center">

                <Avatar
                    src={person?.profilePicture?.src}
                    alt={`${person?.name}'s picture`}
                    size="sm"
                />

                <section className="flex flex-col">

                    <div className="flex items-center gap-2">

                    {
                        person?.role === "guide" ? (
                            <Link
                                href={`/guide/${person?._id}`}
                                className="text-text font-semibold hover:underline"
                            >
                                {person?.name}
                            </Link>

                        ) : (
                            <h3 className="text-text font-semibold">
                                {person?.name}
                            </h3>
                        )
                    }

                    {person?.isVerified && <BadgeCheck size={16} className="stroke-accent" />}

                    </div>

                    {
                        subtitle && (
                            <span
                                className="capitalize text-text/75 text-xs leading-tight"
                                >
                                    {subtitle}
                                </span>
                            )
                    }
                </section>

            </section>

            {
                ( options.star && (person?.rating != null) ) && (
                    <div className="flex flex-col items-center gap-0.5 ">
                        <Star size={16} className="fill-amber-300 stroke-amber-300" />
                        <span className="text-text/75 text-xs">{person?.rating}</span>
                    </div>
                )
            }

        </section>
    );
}