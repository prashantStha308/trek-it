import Image from "next/image"

import Badge from "@/components/ui/Badge";
import {STATUS_VARIANT} from "@/constants/theme.constants.js";
import {formatDate} from "@/utils/utils.helper.js";

export default function BookingHero({booking}) {

    return(
        <section className="relative h-96 w-full overflow-hidden isolate">
            <Image
                src={booking?.package?.thumbnail}
                alt={booking?.package?.name}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-md"
            />

            <section className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-30">
                <div>
                    <h1 className="text-4xl font-bold text-white drop-shadow">
                        {booking?.package?.name}
                    </h1>

                    <p className="text-sm text-white/70 mt-0.5">
                    Trek date: {formatDate(booking?.date)}
                    </p>
                </div>

                <div className="bg-white/75 rounded-xl w-fit" >
                    <Badge variant={STATUS_VARIANT[booking?.status]} size="sm">{booking?.status}</Badge>
                </div>
            </section>

            <div 
                className="absolute left-0 right-0 top-0 bottom-0 bg-black/15 z-20"
            />
            <div
                className="absolute z-10 left-0 right-0 top-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent "
            />

        </section>
    )
}