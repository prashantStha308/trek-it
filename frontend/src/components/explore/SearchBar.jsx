import {motion} from "motion/react";
import {Search} from "lucide-react"

import {RightIcon} from "@/components/input/Icons";


export default function SearchBar({ value, onChange, placeholder }){
	

	return(
		<motion.div
			className="w-full border border-border focus-within:border-primary bg-primary/5 rounded-lg px-4 py-2 flex group"
		>
			<input
				className="border-none outline-none w-full text-text text-sm"
				type="text"
				value={value}
				onChange={onChange}
				placeholder={ placeholder || "Search packages, guides..."}
			/>

			<RightIcon rightIcon = {<Search size={20} />} />

		</motion.div>
	)
} 