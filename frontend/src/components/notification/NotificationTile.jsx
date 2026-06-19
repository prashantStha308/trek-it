import Link from "next/link";
import {motion} from "motion/react";
import {useState, useRef} from "react";

import {
	ChevronRight
} from "lucide-react";

export default function NotificationTile({notif}){
	const tileRef = useRef(null);
	const [isExpanded, useIsExpanded] = useState(false)

	return(
		<motion.article
			ref={tileRef}
			className={`border border-secondary w-full flex justify-between items-center px-4 py-2 rounded-lg hover:bg-white/20 ${notif?.isRead ? "opacity-60" : "opacity-100" } `}
		>
			<div
				className="flex flex-col gap-1 w-10/12"
			>
				<h1 className="text-sm font-semibold" >
					{notif?.title}
				</h1>
				<span className="text-text/75 text-xs" >
					{notif?.message}				
				</span>
			</div>

			{
				notif?.link && (
					<Link
						href={notif?.link}
						className="p-2 hover:bg-accent rounded-lg cursor-pointer text-text/75 hover:text-white"
					>
						<ChevronRight />
					</Link>
				)
			}

		</motion.article>
	)
}