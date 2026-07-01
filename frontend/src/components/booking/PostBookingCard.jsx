import {useRouter} from "next/navigation"

import {useGetMe} from "@/queries/auth.query.js"
import { useCancleBooking } from "@/queries/booking.query.js"
import { showToast } from "@/store/ui.store";


import Badge from "@/components/ui/Badge";
import Card from "@/components/layout/Card";
import {Button} from "@/components/ui/Button";
import MiniCard from "@/components/ui/MiniCard";
import InfoRow from "@/components/ui/InfoRow";
import {STATUS_VARIANT} from "@/constants/theme.constants.js";


export default function PostBookingCard ({booking}){
    const router = useRouter();

    const {data:me, isLoading} = useGetMe();
    const cancleBooking = useCancleBooking();

    const bookingIsCancelled = booking.status == "cancelled";

    const handleCancellation = ()=>{
        cancleBooking.mutate(booking._id,{
            onSuccess: ()=>{
                showToast({
                    message: "Your booking has been cancelled"
                })

                router.replace("/dashboard");
            },
            onError: (err)=>{

                console.log(err)

                showToast({
                    title: "Failed",
                    message: `Failed to cancel your booking.${err.message}`
                })
            }
        });
    }

    return(
        <section className="flex flex-col gap-4 md:sticky md:top-4 md:self-start">

            <Card title="Price Summary">
                <InfoRow 
                    label="Group size"
                    value={`${booking?.groupSize} people`}
                />
                
                <InfoRow
                    label="Per person"
                    value={`$${booking?.package?.pricePerPerson}`}
                />

                <div className="flex items-center justify-between pt-2 mt-1">
                    <span className="text-sm font-semibold text-text">
                        Total
                    </span>

                <div className="relative inline-block">
                    <span className={`text-lg font-bold ${bookingIsCancelled ? "text-red-500" : "text-primary"}`}>
                        ${booking?.totalPrice}
                    </span>

                    {bookingIsCancelled && <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-red-500" />}
                </div>

                </div>

                <p className="text-[11px] text-text/40 mt-1">
                Includes 15% platform commission. Held in escrow until trek completion.
                </p>
            </Card>

            <Card title="Booking Status">
                <div className="flex items-center gap-2">

                    <Badge variant={STATUS_VARIANT[booking?.status]} size="sm">
                        {booking?.status}
                    </Badge>
                    
                    <Badge
                        variant={booking?.payment ? "green" : "red"}
                        size="sm"
                    >
                        {booking?.payment ? "Paid" : "Unpaid"}
                    </Badge>

                </div>

                <div className="flex flex-col gap-2 mt-2">
                    {
                        ((me.role !== "guide") && (!booking?.payment && !bookingIsCancelled )) && (
                            <Button variant="primary" size="sm">Pay now</Button>
                        )
                    }
                    {
                        booking?.status === "pending" && (
                            <Button
                                color="red"
                                variant="outline"
                                size="sm"
                                onClick={handleCancellation}
                                >
                                    Cancel booking
                                </Button>
                        )
                    }
                </div>
            </Card>

        </section>
    )
}