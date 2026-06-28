"use client";

import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "motion/react";
import {
	Bell,
	BellElectric,
	PanelRightClose,
} from "lucide-react";

import Avatar from "@/components/ui/Avatar";

import { useGetMe } from "@/queries/auth.query.js";
import { useGetAllNotifications } from "@/queries/notification.query.js"

import useNotificationStore from "@/store/notification/notification.store.js";

import NotificationBarBadges from "./NotificationBarBadges";
import NotificationBarHeader from "./NotificationBarHeader";
import Notifications from "./Notifications";



export default function NotificationBar({}){
	const sideBarRef = useRef(null);
	const [notificationType, setNotificationType] = useState(null);

	const { data:currentUser, isLoading } = useGetMe();

	const isNotificationOpen = useNotificationStore(store => store.isNotificationOpen);
	const {setIsNotificationOpen} = useNotificationStore.getState();

    useEffect(() => {
        if (!isNotificationOpen) return;
        const handler = (e) => {
            if (
                !sideBarRef.current?.contains(e.target)
            ) setIsNotificationOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isNotificationOpen]);


	return(
		<motion.aside
			id="notificationBarWrapper"
			ref={sideBarRef}
			layout
			transition={{
				type: "spring",
				visualDuration: 0.3,
				bounce: 0.1
			}}
			className={`z-50 fixed right-0 top-0 bottom-0 box-border flex flex-col h-full ${isNotificationOpen ? "w-sm md:w-md" : "w-0"} bg-background border-l-1 border-secondary overflow-hidden`}
		>
			<section
				id="notificationBar"
				className={`h-full ${isNotificationOpen ? "w-full":"w-0"} bg-accent/10 box-border flex flex-col gap-4 justify-between px-6 py-4`}
			>
				<NotificationBarHeader />

				<NotificationBarBadges notificationType={notificationType} setNotificationType={setNotificationType} />
				<Notifications notificationType={notificationType} />

			</section>

		</motion.aside>
	)
}