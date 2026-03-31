import Image from "next/image";

export function PackageCard({item}) {
    return (
        <article
            className="m-4 p-2 flex flex-col gap-4 min-h-28 justify-between rounded-md w-96"
        >
            <div
                id="image-sect"
                className="bg-neutral-200 p-1 rounded-md flex justify-center h-44 w-full object-cover"
            >
            </div>

            <div
                id="details"
                className="p-4 flex flex-col bg-gray-400 "
            >
                <p className="text-base text-neutral-950" >
                    {item.name}
                </p>
            </div>
        </article>
    )
}