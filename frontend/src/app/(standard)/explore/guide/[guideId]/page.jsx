"use client";

import { useParams } from 'next/navigation'

export default function GuidePage(){

	const {guideId} = useParams();

	return (
		<div>
			{guideId}
		</div>
	)
}