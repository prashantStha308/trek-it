"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    useGetPackageById,
    useGetPackageCollaborators,
} from "@/queries/package.query";
import { optimizeImageUrl } from "@/utils/utils.helper";
import Badge from "@/components/ui/Badge";
import BookingCard from "@/components/booking/BookingCard";
import {LinkButton} from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import GuideMiniCard from "@/components/guide/GuideMiniCard"

function PackageDetails({pkg}){

    const fields = [
        { name: "Group Size" , value: pkg?.maxGroupSize, pre:"", post:" person" },
        { name: "Price per person" , value: pkg?.pricePerPerson, pre:"$.", post:"" },
        { name: "Duration" , value: pkg?.daysAlloted, pre:"", post:"days" },
    ]

    return(
        <section className="mx-2 flex flex-col gap-4">
            <h2
                className="text-primary font-semibold text-2xl"
            >
                Details
            </h2>

            <article
                className="flex flex-col gap-2 text-text"
            >
                {
                    fields.map((field, index)=>(
                        <div key={index} className="flex gap-2" >
                            <span className="font-medium"> {field.name}: </span>
                            <span > {field.pre}{field.value}{field.post} </span>
                        </div>

                    ))
                }
            </article>

        </section>

    )
}


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
                <GuideMiniCard guide={pkg?.guide} />
            </section>

            <section
                className="flex flex-col gap-2"
            >
                <h2 className="text-lg font-medium text-primary" > Collaborators </h2>
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
        <section className="flex flex-col gap-6 px-4 pb-12 px-52">

            <section
                id="package-hero"
                className="w-full mx-2 flex justify-between gap-32 p-4 rounded-lg "
            >

                <section
                    className="flex flex-col gap-4"
                >
                    <section className="flex flex-col gap-4" >
                        <h1 className=" text-xl lg:text-3xl text-primary font-bold" >
                            {data?.name}
                        </h1>

                        <article
                            id="package-description"
                            className="flex flex-col gap-1"
                        >
                            <h2
                                className="text-lg text-text font-semibold"
                            >
                                Description
                            </h2>
                            
                            <p>
                                {data?.description}
                            </p>

                        </article>
                    </section>

                    <section
                        className="flex gap-4 "
                    >
                        <LinkButton href="/chat" variant={"outline"} size={"lg"} >
                            Customize this package
                        </LinkButton>

                        <LinkButton variant="primary" href={`/booking/create/${data._id}`} size={"lg"} >
                            Book Now!
                        </LinkButton>

                    </section>

                </section>

                <div className="w-9/12" >
                    <Image
                        src={optimizeImageUrl(data?.thumbnail, 1080)} alt={data?.name}
                        width={400} height={400}
                        className="w-full rounded-md "
                    />
                </div>

            </section>


            <section
                id="details"
                className="w-full flex justify-between gap-8"
            >
                <PackageDetails pkg={data} />

                <PackageGuides pkg={data} />
                
            </section>
        </section>
    );
}