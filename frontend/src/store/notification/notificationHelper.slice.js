import { getAllNotifications } from "@/api/notification.api.js";


const notificationHelperSlice = (set, get) => ({

	loadNotifications: async (page = 1) => {
	    const res = await getAllNotifications({ page, limit: 20 });
	    const incoming = [...res.docs].reverse();
	    const { notifications } = get();

	    const merged = [...notifications, ...incoming];
	    const deduped = Array.from(
	        new Map(merged.map(notif => [notif._id, notif])).values()
	    );

	    set({ notifications: deduped });
	}

})

export default notificationHelperSlice