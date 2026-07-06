import Avatar from "@/components/ui/Avatar";
import ReviewStars from "@/components/review/ReviewStars";
import {
	ThumbsUp,
	ThumbsDown,
	Trash,
} from "lucide-react";
import MiniCard from "@/components/ui/MiniCard";

import { useDeleteReview } from "@/queries/review.query.js";
import { showToast } from "@/store/ui.store";



export default function ReviewCard({review, currentUser}){

	const deletePackage = useDeleteReview(); 

	const handleDelete = ()=> {
		deletePackage.mutate(review._id,{
			onSuccess: ()=>{
				showToast({
					title: "Successful",
					message: "Review Deleted Successfully"
				})
			},
			onError: (err) =>{
				showToast({
					title: "Failed to delete ",
					message: `Error: ${err.message}`
				})
			}
		});
	}

	return(
		<section
			className="px-3 py-2 rounded-sm flex flex-col flex-wrap justify-start gap-3 md:w-sm lg:w-xl bg-secondary/10 border border-primary/40"
		>
			<header
				className="flex items-center justify-between pb-4 border-b border-text/25"
			>
				<MiniCard person={review?.reviewer} subtitle={review?.reviewer?.role} options={{border: false, star: false}} />

				<section className="flex gap-1" >
					<section
						className="flex gap-2 text-text/45"
					>
						<button
							className="rounded-full p-2 hover:bg-secondary/65 cursor-pointer"
						>
							<ThumbsUp size={20} />
						</button>

						<button
							className="rounded-full p-2 hover:bg-secondary/65 cursor-pointer"
						>
							<ThumbsDown size={20} />
						</button>

					</section>
					{
						currentUser?._id === review?.reviewer?._id && (
							<button
								className="p-2 rounded-full hover:bg-secondary/65 text-text/75 hover:text-text cursor-pointer"
								onClick={handleDelete}
							>
								<Trash size={20} />
							</button>
						)
					}

				</section>

			</header>

			<section className="px-4 flex flex-col gap-3 " >

				<section className="grid grid-cols-1 lg:grid-cols-2 gap-1" >
					<div className="flex gap-2" >
						<span className="text-xs text-text/75" > Service </span>
						<ReviewStars rating={review?.rating?.service} />
					</div>

					<div className="flex gap-2" >
						<span className="text-xs text-text/75" > Activities </span>
						<ReviewStars rating={review?.rating?.activities} />
					</div>

					<div className="flex gap-2" >
						<span className="text-xs text-text/75" > Interactivity </span>
						<ReviewStars rating={review?.rating?.interactivity} />
					</div>
				</section>

				<article>
					<textarea
						readOnly
						className="caret-transparent w-full h-fit resize-none text-text text-sm outline-none"
						value={review?.content}
					>
					</textarea>
				</article>
			</section>

		</section>
	)
}