import useSocketStore from "../socket.store";


const notificationActionSlice = (set, get) => ({

	markAllRead: ()=>{

		console.log("markAllRead")

		const {emit} = useSocketStore.getState();
		const {notifications} = get();

		emit("notification:markAllRead", {readCount: notifications.length});
	}

})

export default notificationActionSlice;