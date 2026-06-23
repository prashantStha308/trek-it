import {useState} from "react";
import {Star} from "./ReviewStars.jsx";



export default function StarSelector({ label = "No Label", rating = 0, setRating }){

	const [hover, setHover] = useState(0);

	return(
		<section className="flex gap-4" >
			<span className="text-xs md:text-sm text-text/75" >
				{label}
			</span>

			<div className="flex text-white/75 cursor-pointer" >
				{
					[...Array(5)].map((_, index) =>{

						index += 1;

						return(
							<div
								key={index}
								onClick={() => setRating(index)}
								onMouseEnter={() => setHover(index)}
								onMouseLeave={() => setHover(rating)}
							>
								<Star
									size={20}
									className={`${ index <= (hover || rating) ? "text-[#f59e0b]" : "text-[#d1d5db]" }}`}
									fill={ index <= (hover || rating) ? "#f59e0b" : "#d1d5db" }
								/>
							</div>
						)
					}

					)
				}
			</div>

		</section>
	)
}
