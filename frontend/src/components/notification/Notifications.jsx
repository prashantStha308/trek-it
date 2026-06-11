import {useEffect} from "react";
import {motion} from "motion/react"

import {BellElectric} from "lucide-react"

import {useGetMe} from "@/queries/auth.query.js";
import {useGetAllNotifications} from "@/queries/notification.query.js";
import useNotificationStore from "@/store/notification/notification.store.js";

import NotificationTile from "./NotificationTile";


export default function Notifications({
	notificationType
}){

	const { data:currentUser, isLoading:userLoading } = useGetMe();
	const { data:notifs, isLoading:notifsLoading } = useGetAllNotifications();

	const notifications = useNotificationStore(store => store.notifications);
	const { loadNotifications } = useNotificationStore.getState();

    useEffect(()=>{
    	if(!currentUser) return;

    	loadNotifications(notifs);
    },[notifs])

	const renderedNotifications = notificationType !== null ? (notifications.filter((notif) => notif.isRead === notificationType)) : notifications;

	return(
		<motion.section
			id="notificationSection"
			className="h-full flex flex-col items-start gap-3 overflow-auto scrollbar-none"
		>
				{
					notifications?.length > 0 ? (
						renderedNotifications?.map((notif, index) => <NotificationTile key={index} notif={notif} />)
					): (
						<div className="h-full w-full flex flex-col gap-8 justify-center items-center text-accent/75 " >
							<BellElectric size={100} strokeWidth={1} />
							<h1 className="text-2xl text-center text-primary font-bold w-9/11" >
								Your notifications will appear here
							</h1>
						</div>
					)
				}
		</motion.section>
	)
}