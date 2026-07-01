import {motion} from "motion/react";
import {Search} from "lucide-react"

import {RightIcon} from "@/components/input/Icons";


export default function SearchBar({ value, onChange, placeholder, onFocus, ...props }){
	

	return(
		<motion.div
			className="relative w-full border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-2 flex group isolate"
		>
			<input
				className="border-none outline-none w-full text-text text-sm z-20"
				type="text"
				value={value}
				onChange={onChange}
				placeholder={ placeholder || "Search places, destinations..."}
				onFocus={onFocus}
				{...props}
			/>

			<RightIcon rightIcon = {<Search size={20} />} />

			<div className="borderFollower flex justify-center items-center -z-10 ">
			</div>

		</motion.div>
	)
} 