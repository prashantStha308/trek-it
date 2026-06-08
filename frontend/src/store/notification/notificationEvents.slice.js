import useSocketStore from "../socket.store";


const notificationEventsSlice = (set, get)=>({

	// middleware that prefixes "notifcation:" on event
	prefixer: (event, handler)=>{
        const { on } = useSocketStore.getState();

		const finalEvent = `notification:${event}`;
		on(finalEvent, handler);
	},

	registerNotificationEvents: ()=>{
		const {prefixer} = get();

		const listeners =[

			prefixer("bookingCreated", (newBookingNotif)=>{

			}),

			

		]

        return () => listeners.forEach(fn => fn());

	}
})

export default notificationEventsSlice;