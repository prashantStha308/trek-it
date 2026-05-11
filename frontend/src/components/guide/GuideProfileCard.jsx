import Image from "next/image";
import { Dot, HeartHandshake, Check } from "lucide-react";
import { optimizeImageUrl } from "@/utils/utils.helper";
import { LinkButton } from "../ui/Button";
import Badge from "@/components/ui/Badge"
import Avatar from "@/components/ui/Avatar";


export default function PackageCard({guide}){

    const isAvailable = guide?.isAvailable ?? false ;
    const isTrusted = guide?.isTrusted ?? false;
    const isVerified = guide?.isVerified ?? false;
    const languages = guide?.languages.slice(0,4) ?? [];
    const regions = guide?.regions.slice(0,4) ?? [];

    return(
        <section className="w-56 md:w-60 lg:w-64 xl:w-72 2xl:w-80 rounded-lg px-4 py-2 overflow-hidden flex flex-col rounded-t-lg">

            <header className="relative w-full py-2 flex flex-col items-center gap-1 bg-secondary/75 rounded-t-lg border border-border border-b-transparent"  >

                <div className="flex justify-end w-full relative px-3" >
                    <Badge variant={isAvailable ? "green" : "amber" } size={"xs"} >
                        <div className="flex gap-1 items-center" >
                            <div className={`${isAvailable ? "bg-primary" : "bg-red-500" } w-2 h-2 rounded-full `} />
                            <span> {isAvailable ? "Available" : "Unavailable" } </span>
                        </div>
                    </Badge>               
                </div>

                <Avatar
                    src={guide?.profilePicture.src}
                    alt={guide?.name || "Profile Picture"}
                    size={"lg"}
                />

                <div className="flex justify-start w-full relative px-3" >
                {
                    isTrusted && (
                        <Badge variant="blue"  size={"xs"} >
                            <div className="flex gap-1 items-center " >
                                <HeartHandshake size={14} />
                                <span> Trusted </span>
                            </div>
                        </Badge> 
                    )
                }
                </div>
            </header>

            <section
                className="bg-white dark:bg-slate-700/15 w-full min-h-24 flex flex-col gap-4 px-4 py-2 pb-4 rounded-b-lg border border-border border-t-transparent "
            >
                <article className="flex flex-col gap-1" >
                    <div className="text-sm text-text flex items-center justify-between " >
                        <span>{guide?.name}</span>

                        {
                            isVerified && (
                                    <Badge variant="green"  size={"xs"} >
                                        <Check size={13} />
                                        <span>Verified</span>
                                    </Badge> 
                            )
                        }
                    </div>

                    <div className="capitalize  text-xs text-text/75 flex items-center" >
                        <span> {guide?.gender} </span>
                        <Dot size={15}  />
                        <span> {guide?.age} Yrs </span>
                        <Dot size={15}  />
                        <span> {guide?.address.country} </span>
                    </div>
                </article>

                <article className="flex gap-1 flex-wrap" >
                    {
                        languages?.map((bdg, index)=>(
                            <Badge key={index} variant={"green"} size={"xs"} > {bdg} </Badge>
                        ))
                    }

                    {
                        regions?.map((bdg, index)=>(
                            <Badge key={index} variant={"blue"} size={"xs"} > {bdg} </Badge>
                        ))
                    }
                </article>

                <article className="flex justify-between items-center">
                    <div className="flex flex-col items-center gap-0.5 bg-secondary/45 px-5 py-1 rounded-md ">
                        <span className="text-[10px] text-text/60 uppercase tracking-wide">Ratings</span>
                        <span className="text-xs font-medium">{guide?.rating}/5</span>
                    </div>

                    <div className="flex flex-col items-center gap-0.5 bg-secondary/45 px-5 py-1 rounded-md ">
                        <span className="text-[10px] text-text/60 uppercase tracking-wide"> Treks </span>
                        <span className="text-xs font-medium"> {guide?.trekCount} </span>
                    </div>

                </article>

                <LinkButton
                    variant="primary"
                    href={`/explore/guide/${guide._id}`}
                > 
                    Visit Guide
                </LinkButton> 

            </section>

        </section>
    )
}