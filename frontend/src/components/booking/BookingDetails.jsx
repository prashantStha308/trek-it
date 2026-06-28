import Card from "@/components/layout/Card";
import MiniCard from "@/components/ui/MiniCard";

import PackageDetails from "@/components/package/PackageDetails";
import PackageTimeLine from "@/components/package/PackageTimeLine";

export default function BookingDetails({booking}){
    const isLeadGuide = booking?.package?.guide === booking?.guide?._id;

    const timeLines = [
        { label: "Booked on", date: booking?.createdAt, color: "bg-accent" },
        { label: "Trek date", date: booking?.date, color: "bg-primary" },
    ]

    return(
        <section className="md:col-span-2 flex flex-col gap-4">

            <Card title="Guide">
                <MiniCard person={booking?.guide} subtitle={ isLeadGuide ? "Lead Guide" : "Collaborating Guide" } />
            </Card>

            <PackageDetails pkg={booking?.package} />

            <PackageTimeLine timeLines={timeLines} />


        </section>
    )
}
