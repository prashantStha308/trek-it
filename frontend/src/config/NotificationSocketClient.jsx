"use client"

import useNotificationStore from "@/store/notification/notification.store";
import { useEffect } from "react";

export default function NotificationSocketClient() {
    const registerNotificationEvents = useNotificationStore(store => store.registerNotificationEvents);

    useEffect(() => {
        const unsubscribe = registerNotificationEvents();

        return (() => unsubscribe());
    }, [])

    return null;
}