"use client"
import Image from "next/image";
import { useParams } from "next/navigation";

import {
    useGetPackageById,
    useGetPackageCollaborators,
} from "@/queries/package.query";
import { optimizeImageUrl } from "@/utils/utils.helper";

import Badge from "@/components/ui/Badge";
import {LinkButton} from "@/components/ui/Button";

import Avatar from "@/components/ui/Avatar";
import MiniCard from "@/components/ui/MiniCard";

import Reviews from "@/components/review/Reviews"
import PackageDetails from "@/components/package/PackageDetails";


function PackageGuides({pkg}){

    let {data:collaborators, isLoading} = useGetPackageCollaborators(pkg?._id);    
    collaborators = collaborators?.docs;

    return(
        <section
            className="flex flex-col gap-4"
        >
            <section
                className="flex flex-col gap-4"
            >
                <h2 className="text-xl font-semibold text-primary " > Meet your Gudies </h2>
                <MiniCard person={pkg?.guide} subtitle="Lead Guide" />

            </section>

            <section
                className="flex flex-col gap-2"
            >
                <h2 className="text-lg font-medium text-text" > Collaborators </h2>
                <div className="text-text/60 text-xs flex flex-wrap" >
                    {
                        isLoading ? "Loading..." :
                        collaborators?.length <= 0 ? "No collaborations" : (collaborators?.map((collaborator, idex)=> <Avatar key={index} src={collaborator?.profilePicture?.src} size={"xs"} /> )) 
                    }
                </div>
            </section>

        </section>
    )
}

export default function PackagePage() {
    const { packageId } = useParams();
    const { data, isLoading } = useGetPackageById(packageId);

    if (isLoading) return <p className="p-8 text-text/60">Loading...</p>;

    return (
        <section className="flex flex-col gap-6 px-4 pb-12 ">

            <section
                id="package-hero"
                className=" relative w-full h-96 flex flex-col-reverse items-center lg:flex-row justify-between gap-8 lg:gap-32 p-4 rounded-lg isolate"
            >

                <section
                    className="flex flex-col gap-4"
                >
                    <section className="flex flex-col gap-2 lg:gap-4  [&>*]:px-4 [&>*]:rounded-sm " >
                        <h1 className=" text-xl lg:text-3xl text-primary font-bold w-fit" >
                            {data?.name}
                        </h1>

                        <article
                            id="package-description"
                            className="flex flex-col gap-1.5 w-lg"
                        >
                            <h2
                                className="text-base lg:text-xl text-white font-semibold"
                            >
                                Description
                            </h2>
                            
                            <p className="text-sm md:text-base text-white" >
                                {data?.description}
                            </p>

                        </article>
                    </section>

                    <section
                        className="flex flex-col-reverse md:flex-row gap-4 w-fit "
                    >
                        <LinkButton href="/chat" variant={"outline"} size={"lg"} >
                            <div className="text-white" >
                                Customize this package
                            </div>
                        </LinkButton>

                        <LinkButton variant="primary" href={`/booking/create/${packageId}`} size={"lg"} >
                            Book Now!
                        </LinkButton>

                    </section>

                </section>

                {/*decorators*/}
                <div 
                    className="absolute left-0 right-0 top-0 bottom-0 bg-black/15 -z-20"
                />
                <div
                    className="absolute -z-10 left-0 right-0 top-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent "
                />

                <div className=" " >
                    <Image
                        src={optimizeImageUrl(data?.thumbnail?.src ?? data?.thumbnail, 1080) || "/assets/svg/placeholder-white.svg"} alt={data?.name}
                        className=" object-cover rounded-md -z-30"
                        fill
                    />
                </div>

            </section>


            <section
                id="details"
                className=" w-full flex flex-col items-start md:flex-row justify-between gap-16"
            >
                <div className="flex-1 w-full" >
                    <PackageDetails pkg={data} />
                </div>

                <PackageGuides pkg={data} />
                
            </section>

            <Reviews resource={data} resourceType="package" />

        </section>
    );
}