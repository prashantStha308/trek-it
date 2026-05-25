import {
    Star,BadgeCheck,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export default function GuideMiniCard({guide}){
    return (
        <section
            className="w-full w-xs flex gap-10 justify-between items-center border border-secondary rounded-sm px-4 py-2"
        >
            <section className="w-full flex gap-5 justify-start items-center" >
                <Avatar src={guide?.profilePicture?.src} alt={`${guide?.name}'s profilePicture`} size={"sm"} />

                <section className="flex flex-col" >
                    <div className="flex items-center gap-2" >
                        <h3 className=" text-text font-semibold" >
                            {guide?.name}
                        </h3>
                        {!guide?.isVerified && <BadgeCheck size={16} className="stroke-accent" />}
                    </div>
                    <span className="text-text/75 text-xs leading-tight " > Lead Guide </span>
                </section>
            </section>

            <div className="flex flex-col items-center gap-0.5" >
                <Star size={16} className="fill-amber-300 stroke-amber-300"/>
                <span className="text-text/75 text-xs" > {guide?.rating} </span>
            </div>

        </section>
    )
}