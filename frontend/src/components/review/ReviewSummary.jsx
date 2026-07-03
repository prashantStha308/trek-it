import {useRef, useEffect} from "react";
import {
	useGetPackageAvgReviews,
	useGetGuideAvgReviews,
} from "@/queries/review.query.js";


export const RatingDisplay = ({label="Some label", rating = 4 })=>{

	const containerRef = useRef();
	const childRef = useRef();

	useEffect(()=>{

		const container = containerRef.current;
		const child = childRef.current;

		if(container && child){
			const containerWidth = container.getBoundingClientRect().width;
			const widthToSet = (rating/5) * containerWidth;

			child.style.setProperty("width", `${widthToSet}px`, "important");
		}

	}, [containerRef, childRef, rating])

	return(
		<div className="flex flex-col justify-start" >

			<span className="pl-1 text-xs text-text/75" > {label} </span>

			<div className="flex gap-2 items-center" >

				<span className="text-text font-medium" >
					{rating}
				</span>

				<div
					ref={containerRef}
					className="relative h-2 w-xs lg:w-md rounded-full isolate"
				>
					<div
						ref={childRef}
						className="absolute top-0 left-0 h-full bg-primary rounded-full z-20"
					/>
					<div
						className="w-full h-full bg-secondary rounded-full z-0"
					/>

				</div>
			</div>

		</div>
	)
}


const LABELS = [
	{
		key: "avgServices",
		label:"Services",
	},
	{
		key: "avgInteractivity",
		label:"Interactivity",
	},
	{
		key: "avgActivities",
		label:"Activities",
	},

]

export default function ReviewSummary({resource, resourceType}){

	const targetQuery = resourceType.toLowerCase() === "package" ? useGetPackageAvgReviews : useGetGuideAvgReviews;

	const {data:avgRatings, isLoading} = targetQuery(resource?._id);

	if(isLoading){
		return <h1>Loading...</h1>
	}

	return(
		<section
			className="flex flex-col lg:flex-row gap-2 lg:gap-8 items-center px-10"
		>
			<div className="flex flex-col gap-2" >
				<h1 className="text-5xl font-medium" >
					{avgRatings?.overallAverage === 0 ? "0.0": avgRatings?.overallAverage }
				</h1>
				
				<span className="text-text/75 text-sm" >
					{avgRatings?.totalReviews} reviews
				</span>
			</div>

			<div
				className="flex flex-col gap-2"
			>
				{
					LABELS.map((lbl, index) => (
						<RatingDisplay key={index} label={lbl.label} rating={avgRatings[lbl.key]} />
					))
				}
			</div>

		</section>
	)
}