import {useState} from "react";

import { useGetMe } from "@/queries/auth.query.js";
import { usePostReview } from "@/queries/review.query.js";

import StarSelector from "./StarSelector";
import MiniCard from "@/components/ui/MiniCard";
import {Button, LinkButton} from "@/components/ui/Button";
import {Star} from "./ReviewStars.jsx";

import { showToast } from "@/store/ui.store";


/*** 
 * @param {String} type = 'package' | 'guide'
 * @param {MongoDB.ObjectId} id
 * */
export default function ReviewWriter({ resourceType, resourceId }){

	const {data:me, isLoading} = useGetMe();
	const postReview = usePostReview();

	const [ reviewData, setReviewData ] = useState({
		ratings:{
			services: 0,
			interativity: 0,
			activities: 0,
		},
		comment: "",
		[resourceType === "package" ? "packageId" : "guideId"]: resourceId
	})

	const handleChange = (value, field) =>{
		setReviewData((prev) => ({
			...prev,
			[field]: value
		}))
	}

	const handleRatingChange = (value, field) => {
		setReviewData((prev) => ({
			...prev,
			ratings: {
				...prev.ratings,
				[field]: value
			}
		}))
	}


	const handleCommentSubmission = (e)=>{
		e.preventDefault();


		postReview.mutate(reviewData,{
			onSuccess: ()=>{
				showToast({
					title: "Review Posted Successfully",
					message: "Thank you for sharing you experience"
				})
			},
			onError: (err)=>{


				showToast({
					title: "Review failed",
					message: `An error occured: ${err.message}`
				})
			}
		})

		e.target.reset();
		setReviewData({
			ratings:{
				services: 0,
				interativity: 0,
				activities: 0,
			},
			comment: "",
			[resourceType === "package" ? "packageId" : "guideId"]: resourceId
		})
	}

	return(
		<section
			className="w-full flex flex-col items-center justify-center"
		>
			{
				me ? (
					<form
						onSubmit={handleCommentSubmission}	
						className="flex flex-col gap-8 lg:gap-2"
					>
						<MiniCard person={me} subtitle={me?.role} options={{border: true, star: false}} />

						<section className="grid grid-cols-1 lg:grid-cols-2 gap-3">
							<StarSelector
								label="Services"
								rating={reviewData.ratings.services}
								setRating={(val) => handleRatingChange(val, "services")}
							/>
							<StarSelector
								label="Interativity"
								rating={reviewData.ratings.interativity}
								setRating={(val) => handleRatingChange(val, "interativity")}
							/>
							<StarSelector
								label="Activities"
								rating={reviewData.ratings.activities}
								setRating={(val) => handleRatingChange(val, "activities")}
							/>
						</section>

						<div
							className="border border-text/25 focus-within:border-primary px-4 py-2 rounded-sm flex flex-col"
						>
							<textarea
								name="review"
								id="review"
								placeholder="Leave a review..."
								className="outline-none resize-none"
								cols={30}
								rows={4}
								value={reviewData.comment}
								onChange={(e) => handleChange(e.target.value, "comment")}
							></textarea>

							<div className="flex justify-between items-center pt-2 border-t border-text/25">

								<span className="text-xs w-8/12 text-red-500">
									{/**Note: You must have booked this package to submit a review*/}
								</span>

								<Button variant={"primary"} size={"md"} type="submit" className="w-fit">
									Submit 
								</Button>
							</div>
						</div>
					</form>
				) : (

					<section
						className=" relative w-xs py-10 flex flex-col gap-8 items-center border border-primary/75 rounded-md bg-primary/15"
					>
						<h1 className="text-lg font-semibold text-primary text-center" >
							Login to leave a Review
						</h1>

						<LinkButton
							href="/login"
							size="md"
							color="green"
							variant="primary"
						>
							Login
						</LinkButton>

					</section>

				)
			}
		</section>
	)
}