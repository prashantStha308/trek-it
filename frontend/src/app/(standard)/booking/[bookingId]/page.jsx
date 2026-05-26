"use client"

import {useParams} from "next/navigation"



export default function BookingPage(){

	const {bookingId} = useParams();

	return(
		<h1>
			Page is being built
		</h1>
	)
}