import useSocketStore from "../socket.store";


const notificationEventsSlice = (set, get)=>({

	registerNotificationEvents: ()=>{
		const {prefixer, addNotification} = get();
        const { on } = useSocketStore.getState();


		const listeners =[

			on("notification:readAll", ()=>{
				console.log("Event captured: readAll");

				set(state => ({
				    notifications: state.notifications.map(n => ({ ...n, isRead: true }))
				}))

			}),

			on("notification:bookingCreated", (notif)=>{

				console.log("Event captured: bookingCreated");

				addNotification(notif);
			}),

			on("notification:newBookingRequest", (notif)=>{
				console.log("Event captured: notification:newBookingRequest");

				addNotification(notif);
			}),

			on("notification:bookingCancelled", (notif)=>{
				console.log("Event captured: bookingCancelled");
				
				addNotification(notif);
			}),
		]

        return () => listeners.forEach(fn => fn());

	}
})

export default notificationEventsSlice;