import Image from "next/image";
import { Star } from "lucide-react";

const Pill = ({ text, variant = "green" }) => {
    const styles = {
        green: "bg-green-100 text-green-800 hover:bg-green-200",
        teal: "bg-teal-100 text-teal-800 hover:bg-teal-200",
    };
    return (
        <span className={`text-xs px-3 py-0.5 rounded-full cursor-pointer ${styles[variant]}`}>
            {text}
        </span>
    );
};

export function PackageCard({ item }) {
    return (
        <article className="w-85 bg-blue-50 rounded-xl border border-black/10 overflow-hidden">

            <div className="relative w-full h-44">
                <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
                <span className="absolute top-2.5 right-2.5 bg-black/45 text-white text-xs px-3 py-0.5 rounded-full">
                    {item.daysAlloted} days
                </span>
            </div>

            <div className="p-4 flex flex-col gap-3">

                <div className="flex justify-between items-start gap-2">
                    <p className="text-sm font-medium text-neutral-900 leading-snug">
                        {item.name}
                    </p>
                    <div className="flex items-center gap-1 shrink-0">
                        <Star size={12} className="fill-green-600 text-green-600" />
                        <span className="text-sm font-medium text-neutral-900">{item.rating}</span>
                        <span className="text-xs text-neutral-400">({item.bookingCount})</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                        <Image
                            src={item.guide.profilePicture.src}
                            alt={item.guide.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xs text-neutral-500">{item.guide.name}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {item.guide.languages.map((lang, i) => (
                        <Pill key={i} text={lang} variant="green" />
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                    {item.guide.regions.map((region, i) => (
                        <Pill key={i} text={region} variant="teal" />
                    ))}
                </div>

                <div className="border-t border-black/8 pt-3 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-neutral-400">Starting from</p>
                        <p className="text-base font-medium text-neutral-900">
                            ${item.startingPrice}{" "}
                            <span className="text-xs font-normal text-neutral-500">
                                / ${item.pricePerPerson} pp
                            </span>
                        </p>
                    </div>
                    <button className="bg-green-700 hover:bg-green-800 transition-colors text-white text-xs px-4 py-2 rounded-full cursor-pointer">
                        Book now
                    </button>
                </div>

            </div>
        </article>
    );
}