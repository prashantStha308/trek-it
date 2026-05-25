"use client"

import Image from "next/image";
import { useParams } from "next/navigation";
import {useState} from "react";

import {
	useCreateBooking
} from "@/queries/booking.query.js";
import {
    useGetPackageById,
} from "@/queries/package.query";



export default function BookingPage(){
	const {packageId} = useParams();
	const [bookingData, setBookingData] = useState({

	})

	// Prashant: fetches package only if not in cache, just letting you know(remove this comment later)
	const {data:pkg, isLoading, isError, error} = useGetPackageById(packageId);



	return(
		<section>
			initial booking page
		</section>
	) 
}