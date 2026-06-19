"use client"

import { useParams } from "next/navigation"

import {
	useGetGuideById
} from "@/queries/guide.query.js";

import GuidePageHeader from "@/components/guide/profile/GuidePageHeader";

export default function GuidePage(){

	const {guideId} = useParams();
	const { data:guide, isLoading, isError, error } = useGetGuideById(guideId);

	if(isLoading){
		return "iLoading..."
	}

	if(isError){
		return `Error: ${error}`;
	}

	return(
		<section
			id="guide-preview"
			className=" h-full w-full flex flex-col gap-5"
		>
			<GuidePageHeader guide={guide} />


		</section>
	)
}