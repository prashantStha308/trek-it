import {useState} from "react";
import {
	Sprout
} from "lucide-react";

import {
	useGetPackageReviews,
	useGetGuideReviews,
} from "@/queries/review.query.js";
import {useGetMe} from "@/queries/auth.query.js";

import ReviewCard from "./ReviewCard";
import ReviewWriter from "./ReviewWriter";
import ReviewSummary from "./ReviewSummary";


export default function Reviews({ resource, resourceType }){
	const targetQuery = resourceType.toLowerCase() === "package" ? useGetPackageReviews : useGetGuideReviews;
	const {data:me, isLoading:isMeLoading} = useGetMe();

	const { data, isLoading } = targetQuery(resource._id);
	const reviews = data?.docs;

	console.log(reviews);

	return(
		<section
			className="flex flex-col gap-8 p-4 w-full border-t border-secondary/50"
		>
			<h1
				className="text-primary text-2xl font-semibold"
			>
				Ratings and Reviews
			</h1>

			<div className="flex flex-col gap-8" >
				<div className="w-full flex flex-col lg:flex-row justify-between items-center gap-12 border-b border-b-secondary pb-8" >

					<ReviewSummary resource={resource} resourceType={resourceType} />
					<ReviewWriter resourceType={resourceType} resourceId={resource._id} />

				</div>

				{
					isLoading ? <span> Loading... </span>
					: (
						reviews.length > 0 ? (
							<section
								className="grid grid-cols-1 md:grid-cols-2 gap-8"
							>
								{
									reviews.map((review, index) => <ReviewCard key={index} review={review} currentUser={me} />)
								}
							</section>
						) : (
							<div className="flex flex-col gap-4 justify-center items-center text-2xl font-semibold text-primary text-center pt-10" >
								<Sprout size={70} />

								<span>
									Be the first one to review
								</span>
							</div>
						)
					)
				}
			</div>

		</section>
	)
}