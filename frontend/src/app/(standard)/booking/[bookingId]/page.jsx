"use client";
import { motion } from "motion/react";
import Image from "next/image"
import { useParams } from "next/navigation";

import {useGetBookingById} from "@/queries/booking.query.js"

import PostBookingCard from "@/components/booking/PostBookingCard";
import BookingHero from "@/components/booking/BookingHero";
import BookingDetails from "@/components/booking/BookingDetails";

import Badge from "@/components/ui/Badge";



export default function BookingPage() {
    const { bookingId } = useParams();
    const { data:booking, isLoading } = useGetBookingById(bookingId);

    const pkg = booking?.package;

    if(isLoading) return "Loading..."

    return (
        <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <BookingHero booking={booking} />


            <section className="px-4 pt-3 flex flex-wrap gap-2">
                {
                    pkg?.regions.map((region) => (
                        <Badge key={region} variant="green" size="sm">{region}</Badge>
                    ))
                }
                {
                    pkg?.keywords.map((keyword) => (
                        <Badge key={keyword} variant="blue" size="sm">{keyword}</Badge>
                    ))
                }
                {
                    pkg?.requiresPermit && (
                        <Badge variant="red" size="sm">Permit required</Badge>
                    )
                }

                {
                    pkg?.verified && (
                        <Badge variant="green" size="sm">Verified</Badge>
                    )
                }
            </section>



            <section className="px-4 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                <BookingDetails booking={booking} />
                <PostBookingCard booking={booking} />

            </section>


        </motion.div>
    );
}