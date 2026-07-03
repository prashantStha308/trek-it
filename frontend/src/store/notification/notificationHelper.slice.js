import { getAllNotifications } from "@/api/notification.api.js";


const notificationHelperSlice = (set, get) => ({

	loadNotifications: async (page = 1) => {
	    const res = await getAllNotifications({ page, limit: 20 });
	    // const incoming = [...res.docs].reverse();
	    const { notifications } = get();

	    const merged = [...notifications, ...res.docs];
	    const deduped = Array.from(
	        new Map(merged.map(notif => [notif._id, notif])).values()
	    );

		// const sorted = deduped.sort((a, b) => {
		// 	// if (b.priority !== a.priority) return b.priority - a.priority;
		// 	return b.createdAt - a.createdAt;
		// });

	    set({ notifications: deduped });
	},

	addNotification: (notif)=>{
		set((state) => ({
		    notifications: [notif, ...state.notifications]
		}))
	}

})

export default notificationHelperSlice