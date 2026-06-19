import {motion} from "motion/react";
import {
	Bell,
	PanelRightClose,
} from "lucide-react";

import useNotificationStore from "@/store/notification/notification.store.js";


export default function NotificationBarHeader(){
	const isNotificationOpen = useNotificationStore(store => store.isNotificationOpen);

	return(
		<header
			id="notificationBarHeader"
			className="py-1 flex items-center gap-4 w-full border-b border-secondary"
		>

			<div className="text-primary flex gap-4 items-center" >
				<h1 className="text-lg font-black" >
					Notifications
				</h1>

				<motion.div
				    key={isNotificationOpen ? "open" : "closed"}
				    animate={isNotificationOpen ? { rotate: [-15, 15, -10, 10, -5, 5, 0] } : {}}
				    transition={{
				        type: "tween",
				        duration: 0.6,
				        ease: "easeInOut",
				        delay: 0.25,
				        repeat:1
				    }}
				>
				    <Bell size={20} />
				</motion.div>

			</div>
		</header>
	)
}