import Image from "next/image";


const capsule = (key, text) => {
    return (
        <span key={key}
            className="rounded-full text-xs text-white px-3 py-1 bg-green-700 hover:bg-green-800 cursor-pointer"
        >
            {text}
        </span>
    )
}

export function PackageCard({ item }) {
    
    console.log(item)

    return (
        <article
            className="m-4 p-2 flex flex-col gap-1 min-h-48 justify-between rounded-md w-96"
        >
            <section
                id="image-sect"
                className="p-1 rounded-md flex justify-center h-44 w-full object-cover"
            >
                <Image src={item.thumbnail} alt={item.name} width={700} height={700}
                    className="rounded-md"
                />
            </section>

            <section
                id="details"
                className="p-4 flex flex-col gap-2 bg-green-300/55 rounded-md "
            >
                <p className="text-base text-neutral-950 font-medium " >
                    {item.name}
                </p>
                
                <p className="flex gap-2" >
                    {
                        item.guide.languages.map((lang, index)=> capsule(index, lang) )
                    }
                </p>

                <p className="flex gap-2" >
                    {
                        item.guide.regions.map((lang, index)=> capsule(index, lang) )
                    }
                </p>

            </section>
        </article>
    )
}